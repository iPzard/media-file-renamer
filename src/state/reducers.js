const fileReducer = (state = { fileList: [], directory: '' }, action) => {
  switch (action.type) {
    case 'SET_DIRECTORY':
      return state = { ...state,  directory: action.directory };

    case 'SET_FILES':
      return state = { ...state,  fileList: action.fileList };

    default:
      return state;
  };
};

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

const showReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SHOW':
      return state = action.show;

    default:
      return state;
  };
};

// Set `stateName` for store logic
fileReducer.stateName = 'files';
pageReducer.stateName = 'page';
showReducer.stateName = 'show';

export { fileReducer, pageReducer, showReducer }