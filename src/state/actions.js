export const pageActions = dispatch => ({
  nextPage: () => dispatch({ type: 'NEXT_PAGE' }),
  prevPage: () => dispatch({ type: 'PREV_PAGE' })
});

export const fileActions = dispatch => ({
  setDirectory: directory => dispatch({ type: 'SET_DIRECTORY', directory }),
  setFiles: fileList => dispatch({ type: 'SET_FILES', fileList })
});

export const showActions = dispatch => ({
  setShow: show => dispatch({ type: 'SET_SHOW', show })
})