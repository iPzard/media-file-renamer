import React, { useState } from 'react';
import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import PropTypes from 'prop-types';
import Results from 'components/search/Results';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import Selection from 'components/search/Selection';
import { TvIcon } from 'components/search/icons/TvIcon';
import { connect } from 'react-redux';
import { searchShows } from 'utils/api';
import styles from 'components/search/scss/Search.module.scss';

const Search = props => {

  const [ results, setResults ] = useState([]);
  const { state: { tvShow } } = props;

  return (
    <section className={ styles.search }>
      <Header
        title='Select Show'
        description='Search for the TV Show that matches the files you would like to rename.'
      />
      <SearchBox
        placeholder="Search TV Shows"
        onSearch={ query => searchShows(query, matches => setResults(matches)) }
        onClear={ ()=> setResults([]) }
      />
      {
        results.length ? <Results matches={ results } /> :
        !tvShow ? <TvIcon className={ styles.svg } /> :
        <Selection tvShow={ tvShow } />
      }

      <Footer disabled={{ next: !tvShow }} />
    </section>
  );
};

Search.propTypes = {
  state: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);