import http from 'http';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-audit-'));

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

async function getJson(endpoint) {
  const res = await fetch(`http://127.0.0.1:9333${endpoint}`);
  return await res.json();
}

async function run() {
  await sleep(3000);
  try {
    const list = await getJson('/json/list');
    console.log('Targets:', list.map(t => ({ url: t.url, type: t.type })));
    const target = list.find(t => t.url.includes('localhost:3000')) || list[0];
    if (!target) {
      console.log('No target found');
      return;
    }

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

    // Emulate iPhone / Mobile viewport
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await sleep(2000);

    // 1. Audit Overflow and Navbar
    const auditRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const docEl = document.documentElement;
        const body = document.body;
        const winW = window.innerWidth;
        const scrollW = docEl.scrollWidth;

        // Find elements that overflow horizontally
        const overflowing = [];
        document.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > winW + 1 || rect.left < -1) {
            overflowing.push({
              tag: el.tagName,
              id: el.id,
              className: (el.className || '').toString().slice(0, 80),
              rect: { left: rect.left, right: rect.right, width: rect.width },
              parent: el.parentElement ? el.parentElement.tagName + '.' + (el.parentElement.className || '').toString().slice(0, 40) : null
            });
          }
        });

        // Header Rect
        const header = document.querySelector('header');
        const headerRect = header ? header.getBoundingClientRect() : null;

        return {
          winW,
          scrollW,
          bodyScrollW: body.scrollWidth,
          overflowingCount: overflowing.length,
          overflowing: overflowing.slice(0, 10),
          headerRect
        };
      })()`,
      returnByValue: true
    });

    console.log('Audit initial:', JSON.stringify(auditRes.result?.value, null, 2));

    // Capture initial mobile screenshot
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Mahmoud\\Projects\\Freelance\\sidawi\\test_mobile_top.png', Buffer.from(shot1.result.data, 'base64'));
    console.log('Saved test_mobile_top.png');

    // Scroll down 400px and re-audit
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 400)` });
    await sleep(1000);

    const auditScrolled = await send('Runtime.evaluate', {
      expression: `(() => {
        const header = document.querySelector('header');
        return {
          scrollY: window.scrollY,
          headerRect: header ? header.getBoundingClientRect() : null
        };
      })()`,
      returnByValue: true
    });
    console.log('Audit scrolled:', JSON.stringify(auditScrolled.result?.value, null, 2));

    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Mahmoud\\Projects\\Freelance\\sidawi\\test_mobile_scrolled.png', Buffer.from(shot2.result.data, 'base64'));
    console.log('Saved test_mobile_scrolled.png');

    // Click certificate card to open modal
    await send('Runtime.evaluate', {
      expression: `(() => {
        // find a certificate trigger button or card
        const btn = document.querySelector('button[title*="certificate" i], [aria-label*="certificate" i], .cursor-pointer[class*="certificate"], button:has(img[alt*="Certificate" i])') 
          || Array.from(document.querySelectorAll('button, div')).find(el => el.innerText && el.innerText.includes('Official Reseller Accreditations') || el.innerText && el.innerText.includes('Click to inspect'))
          || Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Liqui Moly') || b.querySelector('img[alt*="Certificate"]'));
        
        // Let's find brand certificate triggers specifically
        const certTriggers = document.querySelectorAll('[class*="BrandPartnerBadge"], [data-cert], button');
        for (const t of certTriggers) {
          if (t.textContent && t.textContent.includes('Verified Reseller')) {
            t.click();
            return { clicked: t.tagName + '.' + t.className };
          }
        }
        return { foundBtn: !!btn };
      })()`,
      returnByValue: true
    });
    await sleep(1000);

    const shot3 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Mahmoud\\Projects\\Freelance\\sidawi\\test_cert_modal.png', Buffer.from(shot3.result.data, 'base64'));

    ws.close();
  } catch (err) {
    console.error('Audit error:', err);
  } finally {
    chrome.kill();
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {}
  }
}

run();
