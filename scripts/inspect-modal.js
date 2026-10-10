import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-modal-'));

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9333',
  '--remote-allow-origins=*',
  `--user-data-dir=${tempDir}`,
  '--window-size=375,812',
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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await sleep(2000);

    // Scroll to the brand certificates section
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, 900)`
    });
    await sleep(800);

    // Click the first certificate trigger
    const clickRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('[aria-label*="Inspect official certificate"]');
        if (btn) {
          btn.click();
          return { clicked: true, label: btn.getAttribute('aria-label') };
        }
        return { clicked: false };
      })()`,
      returnByValue: true
    });
    console.log('Click result:', clickRes.result?.value);

    await sleep(1000);

    // Now inspect CertificateModal elements
    const modalAudit = await send('Runtime.evaluate', {
      expression: `(() => {
        const dialog = document.querySelector('[role="dialog"]');
        if (!dialog) return { foundDialog: false };
        const dialogRect = dialog.getBoundingClientRect();
        const header = dialog.querySelector('header');
        const headerRect = header ? header.getBoundingClientRect() : null;
        const footer = dialog.querySelector('footer');
        const footerRect = footer ? footer.getBoundingClientRect() : null;
        const buttons = Array.from(dialog.querySelectorAll('button, a')).map(b => {
          const r = b.getBoundingClientRect();
          return {
            tag: b.tagName,
            title: b.getAttribute('title') || b.getAttribute('aria-label') || b.textContent.trim().slice(0, 20),
            rect: { top: r.top, bottom: r.bottom, height: r.height, left: r.left, right: r.right, width: r.width }
          };
        });
        return {
          windowH: window.innerHeight,
          windowW: window.innerWidth,
          dialogRect,
          headerRect,
          footerRect,
          buttons
        };
      })()`,
      returnByValue: true
    });
    console.log('Modal audit:', JSON.stringify(modalAudit.result?.value, null, 2));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Mahmoud\\Projects\\Freelance\\sidawi\\test_cert_modal.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Saved test_cert_modal.png');

    ws.close();
  } catch (err) {
    console.error('Modal inspect error:', err);
  } finally {
    chrome.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}
  }
}
run();
