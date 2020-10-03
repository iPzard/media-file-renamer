const { spawn } = require('child_process');
const app = 'app.py';

// Build Pyinstaller executable
spawn(`pyinstaller --noconsole ${app}`, { detached: false, shell: true, stdio: 'inherit' });