# Media File Renamer
> Open source media file renamer, built with Electron, React, & Python. Easily rename digital copies of your favorite titles, in bulk. Keeping the names accurate, and making them easier to import to media libraries such as Plex and/or Kodi.<br><br>

![media_file_renamer](https://user-images.githubusercontent.com/8584126/92296836-b20bd080-eeed-11ea-9672-424185d9bbf6.gif)

## 💾 Downloads
Downloads are available for Windows and macOS; in their respective links below:

**Windows:**
* [win32-x64](https://drive.google.com/file/d/1VnCBqaA4DG1g8Du1zpkFQMlLolmOo3Vc/view?usp=sharing)

**macOS:**
* [darwin-x64](https://drive.google.com/file/d/1iOyh_irWwGQ4SwF15iSl12CSphfB-S3L/view?usp=sharing)

<br>

## 🛠️ Install dependencies
Clone this repository, navigate to its directory, and install Node & Python dependencies:

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
To build and run locally (e.g., for developing), you can clone the project and then run the following scripts in the project's root directory, in order to start electron, you must first build React & Python:

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
* TV information is provided by the [TVmaze API](https://www.tvmaze.com/api).
* SVG icons used are from [Font Awesome](http://fontawesome.io) and fully open-source.

<br>

## 🐱‍👓 Docs
Code documentation for this project, created with [JSDoc](https://github.com/jsdoc/jsdoc), can be found here:<br>
[Media File Renamer](https://ipzard.github.io/media-file-renamer/)

<br>

## 🏷️ License
MIT © [Media File Renamer](https://github.com/iPzard/media-file-renamer/blob/master/LICENSE)