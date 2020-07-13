// Actions for navigating pages
export const pageActions = dispatch => ({
  handleNext: () => dispatch({ type: 'PAGE_NEXT' }),
  handleBack: () => dispatch({ type: 'PAGE_BACK' })
});