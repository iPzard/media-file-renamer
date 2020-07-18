export const fileActions = dispatch => ({
  setDirectory: directory => dispatch({ type: 'SET_DIRECTORY', directory }),
  setFiles: fileList => dispatch({ type: 'SET_FILES', fileList }),
});

export const renameOptionsActions = dispatch => ({
  setRenameData: (renameData, selection) => dispatch({ type: 'SET_RENAME_DATA', renameData, selection })
});

export const pageActions = dispatch => ({
  nextPage: (skip = 0) => dispatch({ type: 'NEXT_PAGE', skip }),
  prevPage: (skip = 0) => dispatch({ type: 'PREV_PAGE', skip  })
});

export const tvShowActions = dispatch => ({
  setEpisodes: episodes => dispatch({ type: 'SET_EPISODES', episodes }),
  setSeason: season => dispatch({ type: 'SET_SEASON', season }),
  setTvShow: tvShow => dispatch({ type: 'SET_TV_SHOW', tvShow }),
  setTVShowAll: (tvShow, episodes, season) => dispatch({ type: 'SET_TV_SHOW_ALL', tvShow, episodes, season })
});