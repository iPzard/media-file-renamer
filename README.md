# Media File Renamer
> Open source media file renamer, built with Electron, React, & Python. Easily rename digital copies of your favorite titles, in bulk. Keeping the names accurate, and making them easier to import to media libraries such as Plex and/or Kodi.<br><br>

![media_file_renamer](https://user-images.githubusercontent.com/8584126/92296836-b20bd080-eeed-11ea-9672-424185d9bbf6.gif)

## 💾 Downloads
Downloads are available for Windows, macOS, and Linux; in their respective links below:

**Windows:**
* [win32-ia32](https://drive.google.com/file/d/1rfcX-IMp7oSUwigkGkhBBVpa9V57Vbdg/view?usp=sharing)
* [win32-x64](https://drive.google.com/file/d/1VnCBqaA4DG1g8Du1zpkFQMlLolmOo3Vc/view?usp=sharing)
* [win32-arm64](https://drive.google.com/file/d/1qQt43lc56HBkpfIxiGuZPiIdRGsZ-j-O/view?usp=sharing)

**macOS:**
* [darwin-x64](https://drive.google.com/file/d/1iOyh_irWwGQ4SwF15iSl12CSphfB-S3L/view?usp=sharing)

**Linux:**
* [linux-ia32](https://drive.google.com/file/d/1u4NSe_bwBSy1WGZ2jG-KOakrxUvbg0cZ/view?usp=sharing)
* [linux-x64](https://drive.google.com/file/d/1gcWrS9i2bMExorjDlHRwcL9_lm12emyv/view?usp=sharing)
* [linux-armv7l](https://drive.google.com/file/d/1cKXgZU5FIpUpb0xWsxqxwonSzNnAZUvU/view?usp=sharing)
* [linux-arm64](https://drive.google.com/file/d/1i8v8DzNhR8TDNxbYzDYxdwTXZ3Bmr3t4/view?usp=sharing)

<br>

## 📜 Scripts
To build and run locally (e.g., for developing), you can clone the project and then run the following scripts in the project's root directory, in order to start electron, you must first build React & Python:

**Install Dependencies:**
```bash
npm install
```

**Build Documentation:**
```bash
npm run build:docs
```

**Build React & Python:**
```bash
npm run build
```

**Build React:**
```bash
npm run build:react
```

**Build Python:**
```bash
npm run build:python
```

**Start Electron:**
```bash
npm run start
```
<br>

## 📦 Packaging

**Build Linux:**
```bash
npm run build:package:linux
```

**Build MacOS:**
```bash
npm run build:package:mac
```

**Build Windows:**
```bash
npm run build:package:windows
```

**Build all:**
```bash
npm run build:package:all
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