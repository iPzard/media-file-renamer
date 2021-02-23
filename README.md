# Media File Renamer

[![Build](https://img.shields.io/badge/build-passing-%2357a9a9?style=for-the-badge)](https://github.com/iPzard/media-file-renamer#readme)
[![License](https://img.shields.io/github/license/iPzard/media-file-renamer?color=57a9a9&style=for-the-badge)](https://github.com/iPzard/media-file-renamer/blob/master/LICENSE)
[![Github All Releases](https://img.shields.io/github/downloads/iPzard/media-file-renamer/total.svg?color=57a9a9&style=for-the-badge)](https://github.com/iPzard/media-file-renamer/releases)

> Open source media file renamer, built with Electron, React, & Python. Easily rename digital copies of your favorite titles, in bulk. Keeping the names accurate, and making them easier to import to media libraries such as Plex and/or Kodi.<br><br>

![media_file_renamer](https://user-images.githubusercontent.com/8584126/92296836-b20bd080-eeed-11ea-9672-424185d9bbf6.gif)

## 💾 Downloads
Media File Renamer works on Windows 32-bit (x86) and Windows 64-bit (x64) operating systems, see the project's [releases page](https://github.com/iPzard/media-file-renamer/releases/) for download links.
<br><br>

## 🛠️ Setup
To build and run locally *(e.g., for developing)*, ensure you have [Node](https://nodejs.org/en/download/) and [Python](https://www.python.org/downloads/) installed, then clone this repository. After it's cloned, navigate to the project's root directory on your computer and run the following scripts in a terminal application *(e.g., Git Bash)*:

**Python dependencies:**
```bash
pip3 install -r requirements.txt
```

**Node dependencies:**
```bash
yarn install
```

<br>

## 📜 Scripts
in order to start electron, you must first build React & Python:

**Build Documentation:**
```bash
yarn run build:docs
```

**Build React & Python:**
```bash
yarn run build:all
```

**Build React:**
```bash
yarn run build:react
```

**Build Python:**
```bash
yarn run build:python
```

**Start Electron:**
```bash
yarn run start
```
<br>

## 📦 Packaging

**Build Windows:**
```bash
yarn run build:package:windows
```

**Build MacOS:**
```bash
yarn run build:package:mac
```
<br>


## 🙏 Attribution
* TV information is provided by the [TVmaze API](https://www.tvmaze.com/api)
* SVG icons used are from [Font Awesome](http://fontawesome.io)
<br>

## 🐱‍👓 Docs
Code documentation for this project, created with [JSDoc](https://github.com/jsdoc/jsdoc), can be found here:<br>
[Media File Renamer](https://ipzard.github.io/media-file-renamer/)
<br><br>

## 🦟 Software bugs
Bugs reported on the project's [issues page](https://github.com/iPzard/media-file-renamer/issues) will be exterminated as quickly as possible, be sure to include steps to reproduce so they can be spotted easily.
<br><br>

## 🏷️ License
MIT © [Media File Renamer](https://github.com/iPzard/media-file-renamer/blob/master/LICENSE)