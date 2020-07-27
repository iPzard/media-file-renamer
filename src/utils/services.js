import { post } from 'utils/requests';

// Electron Inter Process Communication and dialog
const { ipcRenderer, remote: { dialog } } = window.require('electron');

/**
 * @namespace Services
 * @description - Services to interact with Electron
 */


/**
 * @description - Methods from Electron Inter Process Communication.
 * @property {function} maximize - Function to maximize the screen size of the program.
 * @property {function} minimize - Function to minimize the screen size of the program.
 * @property {function} quit - Function to close and exit the program.
 * @property {function} resize - Function to resize the screen size of the program, accepts ({ width: x, height: x }).
 * @property {function} unmaximize - Function to contract (unmaximize) the screen size of the program.
 * @memberof Services
 */
// Methods to communicate with Electron services
export const app = {
  maximize:   () => ipcRenderer.send('app-maximize'),
  minimize:   () => ipcRenderer.send('app-minimize'),
  quit:       () => ipcRenderer.send('app-quit'),
  resize:   size => ipcRenderer.send('resize-window', size),
  unmaximize: () => ipcRenderer.send('app-unmaximize'),
};


/**
* @description - Function to get a list of files that a user wants to have renamed, this
* also returns the folder path and name the user has selected.
* @param {Function} callback - Optional callback function to be invoked if provided.
* @return - User selected folder path and list/array of files in that folder.
* @memberof Services
*
* @todo - Should only accept video files
*/
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

/**
 * @description - Function to rename files with matched files, in original directory (for now).
 *
 * @memberof Services
 */
export const renameFiles = (folder, names, callback) => {
  const data = { folder, names };
  post(data, 'rename_files', response => console.log(response)); // callback goes here later
};