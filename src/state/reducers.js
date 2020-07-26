const fileReducer = (state = { fileList: [], directory: '', renameData: {} }, action) => {
  switch (action.type) {
    case 'SET_DIRECTORY':
      return state = { ...state,  directory: action.directory };

    case 'SET_FILES':
      return state = { ...state,  fileList: action.fileList };

    default:
      return state;
  };
};


const renameOptionsReducer = (state = {
  renameData: { files: [], names: [] },
  selection: 0
}, action) => {

  switch (action.type) {
    case 'SET_RENAME_DATA':
      return state = { ...state, renameData: action.renameData, selection: action.selection || 0 };

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


const tvShowReducer = (state = false, action) => {

  const updateState = (key, value) => state ? { ...state, [key]: action[value] } : action[value];

  switch (action.type) {
    case 'SET_EPISODES':
      return state = updateState('episodes', 'episodes');

    case 'SET_SEASON':
      return state = updateState('season', 'season');

    case 'SET_TV_SHOW':
      return state = updateState('tvShowData', 'tvShow');

    case 'SET_TV_SHOW_ALL':
      const all = {
        tvShowData: action.tvShow,
        episodes: action.episodes,
        season: action.season
      };

      return state ? { ...state, ...all } : { ...all }

    default:
      return state;
  };
};


// Set `stateName` for store logic
fileReducer.stateName = 'files';
pageReducer.stateName = 'page';
renameOptionsReducer.stateName = 'options';
tvShowReducer.stateName = 'tvShow';


export {
  fileReducer,
  pageReducer,
  renameOptionsReducer,
  tvShowReducer
}