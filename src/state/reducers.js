const fileReducer = (
  state = { fileList: [], directory: '' },
  action
) => {
  switch (action.type) {
    case 'SET_DIRECTORY':
      return state = { ...state,  directory: action.directory };

    case 'SET_FILES':
      return state = { ...state,  fileList: action.fileList };

    default:
      return state;
  };
};
fileReducer.stateName = 'files';

const pageReducer = (state = 1, action) => {
  switch (action.type) {
    case 'NEXT_PAGE':
      return state + 1;

    case 'PREV_PAGE':
      return state - 1;

    default:
      return state;
  };
};
pageReducer.stateName = 'page';

const showReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SHOW':
      return state = action.show;

    default:
      return state;
  };
};
showReducer.stateName = 'show';

export { fileReducer, pageReducer, showReducer }