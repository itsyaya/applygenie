import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log('Starting frontend server...');
  const child = spawn('npm', ['run', 'dev'], { cwd: __dirname, shell: true });
  
  // Wait for the server to be completely up
  await delay(5000); // 5 seconds should be enough

  const baseDir = path.join(__dirname, '..', 'assets');
  if (!fs.existsSync(baseDir)){
      fs.mkdirSync(baseDir);
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const routes = [
    { path: '/', name: 'landing' },
    { path: '/login', name: 'login' },
    { path: '/register', name: 'register' },
    { path: '/dashboard', name: 'dashboard' }
  ];

  for (const route of routes) {
    try {
      console.log(`Navigating to ${route.path}...`);
      await page.goto(`http://localhost:5173${route.path}`, { waitUntil: 'networkidle0', timeout: 30000 });
      await delay(2000); // extra wait for animations
      
      const screenshotPath = path.join(baseDir, `${route.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Saved screenshot: ${screenshotPath}`);
    } catch (err) {
      console.error(`Failed to screenshot ${route.path}:`, err);
    }
  }

  await browser.close();
  child.kill('SIGINT');
  console.log('Done!');
  process.exit(0);
}

run();
