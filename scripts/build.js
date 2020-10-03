const fs = require('fs')
const { spawn } = require('child_process');

// Builds React & Python builds of project
// "build:react": "react-scripts build",
// "build:python": "node ./scripts/pyinstaller",


// Check if project is using npm or yarn
const npm = './package-lock.json';
const yarn = './yarn.lock';
const command = (() => {
  try {
    if(fs.existsSync(npm))
      return 'npm';

    else if(fs.existsSync(yarn))
      return 'yarn';
  }

  catch(error) {
    console.error(error);
  }
})();

spawn(`${command} run build:react && ${command} run build:python`, { detached: false, shell: true, stdio: 'inherit' });