/**
 * @description - Actions to set files and directories in state.
 * @param {string} directory - Directory files are selected from.
 * @param {Array.<string>} fileList - Array of file names from selected directory.
 * @memberof Redux
 */
export const fileActions = dispatch => ({
  setDirectory: directory => dispatch({ type: 'SET_DIRECTORY', directory }),
  setFiles: fileList => dispatch({ type: 'SET_FILES', fileList }),
});

/**
 * @description - Actions to set and update rename data object.
 * @param {Object} renameData - Object containing rename data for files and TV show names.
 * @param {number} selection - Selected index of file names the user is currently focusing on.
 * @memberof Redux
 */
export const renameOptionsActions = dispatch => ({
  setRenameData: (renameData, selection) => dispatch({ type: 'SET_RENAME_DATA', renameData, selection })
});

/**
 * @description - Actions change the page the user is on; file select, search, rename, etc..
 * @memberof Redux
 */
export const pageActions = dispatch => ({
  nextPage: () => dispatch({ type: 'NEXT_PAGE' }),
  prevPage: () => dispatch({ type: 'PREV_PAGE' })
});


/**
 * @description - Actions to set and update TV show data.
 * @param {Function} setEpisodes - Function to set the episodes for a matching TV show.
 * @param {Function} setSeason - Function to set the season for a matching TV show.
 * @param {Function} setTvShow - Function to set a TV show as the matching show.
 * @param {Function} setTVShowAll - Function to update all aspects of the TV show data.
 * @memberof Redux
 */
export const tvShowActions = dispatch => ({
  setEpisodes: episodes => dispatch({ type: 'SET_EPISODES', episodes }),
  setSeason: season => dispatch({ type: 'SET_SEASON', season }),
  setTvShow: tvShow => dispatch({ type: 'SET_TV_SHOW', tvShow }),
  setTVShowAll: (tvShow, episodes, season) => dispatch({ type: 'SET_TV_SHOW_ALL', tvShow, episodes, season })
});