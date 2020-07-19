import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import PropTypes from 'prop-types';
import React from 'react';
import Rename from 'components/rename/Rename';
import Search from 'components/search/Search';
import Select from 'components/select/Select';
import Titlebar from 'components/titlebar/Titlebar';
import { connect } from 'react-redux';
import { customTheme } from 'theme/palette';
import { loadTheme } from 'office-ui-fabric-react';
import styles from 'components/App.module.scss';

loadTheme({ palette: customTheme });

const App = props => {
  const { state: { page } } = props;

  return (
    <main className={ styles.main }>
      <Titlebar />
      {
        page === 1 ? <Select /> :
        page === 2 ? <Search /> :
        <Rename />
      }
    </main>
  );
};

App.propTypes = {
  state: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
