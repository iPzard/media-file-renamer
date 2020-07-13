import { pageActions } from 'state/actions';

export const mapStateToProps = state => ({ state });

export const mapDispatchToProps = dispatch => {
  const actions = {
    ...pageActions(dispatch)
  };

  return actions;
};