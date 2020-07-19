import React, { useEffect } from 'react';
import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import PropTypes from 'prop-types';
import Titlebar from 'components/titlebar/Titlebar';
import { config } from 'components/App.config';
import { connect } from 'react-redux';
import { customTheme } from 'theme/palette';
import { loadTheme } from 'office-ui-fabric-react';
import styles from 'components/App.module.scss';

loadTheme({ palette: customTheme });


const App = props => {
  const { state: { page } } = props;

  useEffect(()=> config[page].setScreenSize(), [page]);

  return (
    <main className={ styles.main }>
      <Titlebar />
      { config[page].component }
    </main>
  );
};

App.propTypes = {
  state: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
