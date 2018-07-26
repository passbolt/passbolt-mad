const puppeteer = require('puppeteer');
process.env.LAUNCHPAD_CHROMIUM = puppeteer.executablePath();

module.exports = {
  browsers: [
    {
      browser: 'chromium',
      args: [
        '--headless',
        '--disable-gpu',
        '--remote-debugging-port=9222'
      ]
    }
  ]
};
