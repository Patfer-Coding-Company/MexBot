/**
 * Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks
 * Chrome Extension Manifest
 */

import { defineManifest } from '@crxjs/vite-plugin';
import { version } from './package.json';

export default defineManifest({
  manifest_version: 3,
  name: 'MexBot: AI Web Agent & Automation - Made by Patfer Coding Company',
  description:
    'Automate web tasks with AI! MexBot is a proprietary Chrome extension that lets you extract data, fill forms, and more. Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks',
  version,
  author: 'Patrick Blanks',
  copyright: 'Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks',
  permissions: ['activeTab', 'scripting', 'storage', 'debugger', 'sidePanel', 'tabs'],
  host_permissions: ['http://*/*', 'https://*/*'],
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/index.ts'],
    },
  ],
  side_panel: {
    default_path: 'side-panel/index.html',
  },
  options_page: 'options/index.html',
  web_accessible_resources: [
    {
      resources: ['buildDomTree.js', 'pricing/index.html'],
      matches: ['<all_urls>'],
    },
  ],
  action: {
    default_title: 'MexBot',
    default_icon: {
      16: 'icon-16.png',
      32: 'icon-32.png',
      48: 'icon-48.png',
      128: 'icon-128.png',
    },
  },
  icons: {
    16: 'icon-16.png',
    32: 'icon-32.png',
    48: 'icon-48.png',
    128: 'icon-128.png',
  },
  sidebar_action: {
    default_panel: 'side-panel/index.html',
    default_title: 'MexBot',
    default_icon: 'icon-32.png',
  },
  chrome_url_overrides: {
    newtab: 'newtab/index.html',
  },
});
