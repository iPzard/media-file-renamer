const episodeReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_EPISODES':
      return state = action.episodes;

    default:
      return state;
  }
};

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
  const { skip } = action;

  switch (action.type) {
    case 'NEXT_PAGE':
      return state + (1 + skip);

    case 'PREV_PAGE':
      return state - (1 + skip);

    default:
      return state;
  };
};

const seasonReducer = (state = 1, action) => {
  switch (action.type) {
    case 'SET_SEASON':
      return state = action.season;

    default:
      return state;
  };
};

const tvShowReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_TV_SHOW':
      return state = action.tvShow;

    default:
      return state;
  };
};

// Set `stateName` for store logic
episodeReducer.stateName = 'episodes';
fileReducer.stateName = 'files';
pageReducer.stateName = 'page';
seasonReducer.stateName = 'season';
tvShowReducer.stateName = 'tvShow';

export {
  episodeReducer,
  fileReducer,
  pageReducer,
  seasonReducer,
  tvShowReducer
}