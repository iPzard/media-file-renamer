import { post } from 'utils/requests';
//import { searchSeries } from 'utils/api';

// Electron Inter Process Communication and dialog
const { ipcRenderer, remote: { dialog } } = window.require('electron');

// DEV: Developer zone
// TODO: use icpRenderer to configure the titlebar
export const app = {
  maximize: () => ipcRenderer.send('app-maximize'),
  minimize: () => ipcRenderer.send('app-minimize'),
  quit: () => ipcRenderer.send('app-quit'),
  unmaximize: () => ipcRenderer.send('app-unmaximize')
};


/**
* Method to get a list of files that a user wants to have renamed, this
* also returns the folder path and name the user has selected.
* @param callback - optional callback function to be invoked if provided.
* @return user selected folder path and list/array of files in that folder.
*/

// TODO: Should only accept video files
export const getFiles = (callback) => {
  dialog.showOpenDialog({properties: ['openDirectory']})
  .catch(error => console.error(error))

  .then( response => {
    if(!response.canceled) {
      const folder = String.raw`${response.filePaths[0]}`;
      post(folder, 'get_files', fileList => callback(fileList, folder) || undefined);
    } else console.log('response canceled.');
  });

};