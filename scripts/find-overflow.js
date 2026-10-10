import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-overflow-'));

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9333',
  '--remote-allow-origins=*',
  `--user-data-dir=${tempDir}`,
  '--window-size=390,844',
  '--disable-gpu',
  'http://localhost:3000'
]);

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  await sleep(2500);
  try {
    const res = await fetch('http://127.0.0.1:9333/json/list');
    const list = await res.json();
    const target = list.find(t => t.url.includes('localhost:3000')) || list[0];

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg);
        callbacks.delete(msg.id);
      }
    };

    await new Promise(resolve => ws.onopen = resolve);

    function send(method, params = {}) {
      return new Promise(resolve => {
        const msgId = id++;
        callbacks.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('DOM.enable');
    await send('Runtime.enable');

    // Test different widths: 375 (iPhone), 390 (iPhone 14), 768 (tablet), 1280 (desktop)
    for (const w of [360, 375, 390, 768, 1280]) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: w,
        height: 844,
        deviceScaleFactor: 2,
        mobile: w < 1000,
      });
      await sleep(1000);

      const overflowRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const docEl = document.documentElement;
          const scrollW = docEl.scrollWidth;
          const clientW = docEl.clientWidth;
          const innerW = window.innerWidth;
          const hasHScroll = scrollW > clientW;

          const offenders = [];
          document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > innerW + 1 || r.left < -1) {
              offenders.push({
                tag: el.tagName,
                id: el.id,
                classes: el.className ? el.className.toString().slice(0, 100) : '',
                rect: { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) }
              });
            }
          });

          return {
            viewportWidth: ` + w + `,
            clientW,
            scrollW,
            hasHScroll,
            offendersCount: offenders.length,
            offenders: offenders.slice(0, 10)
          };
        })()`,
        returnByValue: true
      });

      console.log('Width ' + w + ':', JSON.stringify(overflowRes.result?.result?.value, null, 2));
    }

    ws.close();
  } catch (err) {
    console.error('Overflow inspect error:', err);
  } finally {
    chrome.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}
  }
}
run();
