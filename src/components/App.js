import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

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

  const Page = () => {
    switch(props.state.page) {
      case 1:
        return <Select />;
      case 2:
        return <Search />;
      case 3:
        return <Rename />;
    }
  }
  console.log(props)
  return (
    <main className={ styles.main }>
      <Titlebar />
      <Page />
    </main>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
