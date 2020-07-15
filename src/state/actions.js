export const pageActions = dispatch => ({
  nextPage: (skip = 0) => dispatch({ type: 'NEXT_PAGE', skip }),
  prevPage: (skip = 0) => dispatch({ type: 'PREV_PAGE', skip  })
});

export const fileActions = dispatch => ({
  setDirectory: directory => dispatch({ type: 'SET_DIRECTORY', directory }),
  setFiles: fileList => dispatch({ type: 'SET_FILES', fileList })
});

export const seasonActions = dispatch => ({
  setSeason: season => dispatch({ type: 'SET_SEASON', season })
});

export const episodeActions = dispatch => ({
  setEpisodes: episodes => dispatch({ type: 'SET_EPISODES', episodes })
});

export const tvShowActions = dispatch => ({
  setTvShow: tvShow => dispatch({ type: 'SET_TV_SHOW', tvShow })
})