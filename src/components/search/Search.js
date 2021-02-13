import React, { useEffect, useState } from 'react';
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

/**
 * @namespace Search
 * @description Search page to search for shows and display matching show's information.
 *
 * @property {Object} state Object containing Redux mapped props.
 * @property {Object} state.tvShow Object containing information about matching TV Show.
 */

const Search = (props) => {

  const [ results, setResults ] = useState([]);
  const [ backToggle, setBackToggle ] = useState(true);
  const { prevPage, state: { tvShow } } = props;

  useEffect(() => {
    if(results.length && !backToggle)
      setBackToggle(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  const customFunctions = {
    back: ()=> tvShow && backToggle ? setBackToggle(false) : prevPage()
  };

  const sections = {
    results: <Results matches={ results } setResults={ setResults } />,
    tvIcon: <TvIcon className={ styles.svg } />,
    selection: <Selection />
  };


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
        results.length ? sections.results :
        !tvShow || !backToggle ? sections.tvIcon :
        sections.selection
      }

      <Footer disabled={{ next: !tvShow || !backToggle }} customFunctions={ customFunctions }/>
    </section>
  );
};

Search.propTypes = {
  state: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);