export const pageReducer = (state = 0, action) => {
  switch (action.type) {
    case 'PAGE_NEXT':
      return state + 1;

    case 'PAGE_BACK':
      return state - 1;

    default:
      return state;
  };
};