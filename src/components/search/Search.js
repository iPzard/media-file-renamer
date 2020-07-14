import React, { useState } from 'react';

import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import Results from 'components/search/Results';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { searchShows } from 'utils/api';
import styles from 'components/search/Search.module.scss';

const Search = props => {

  const [ results, setResults ] = useState([]);

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
      { results.length ? <Results matches={ results } /> : undefined }
      <Footer disabled={{ next: true }} />
    </section>
  );
};

export default Search;