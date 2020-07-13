import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import React from 'react';
import Select from 'components/select/Select';
import { app } from 'utils/services';
import { connect } from 'react-redux';
import { customTheme } from 'theme/palette';
import { loadTheme } from 'office-ui-fabric-react';
import styles from 'components/App.module.scss';

loadTheme({ palette: customTheme });

const App = props => {


  const { state } = props;
  console.log(state)
  // TODO: set page setting logic
  // update footer to have actions
  const { maximize, minimize, quit } = app;
  // DEV: developer zone
  const handleClick = ()=> quit();
  const handleMin = ()=> minimize();
  const handleMax = ()=> maximize();

  return (
    <main className={ styles.main }>
      <button onClick={ handleClick } id="test"></button>
      <button onClick={ handleMin } id="min"></button>
      <button onClick={ handleMax } id="max"></button>
      <Select />
    </main>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
