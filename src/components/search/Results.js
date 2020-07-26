import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getEpisodeList } from 'utils/api';
import styles from 'components/search/scss/Results.module.scss';

/**
 * @description - Results page to display matching search results.
 *
 * @property {Array} matches - Array of TV shows that match search query.
 * @property {Function} setResults - Function to reset the results or update with new matches.
 * @property {Function} setTvShowAll - Function to update all TV show details in the Redux store.
 * @memberof Search
 */

const Results = props => {
  const {
    matches,
    setResults,
    setTVShowAll
  } = props;

  const updateTvShow = match => {
    getEpisodeList(match.show.id, episodes =>
      setTVShowAll(match, episodes, 1));
    setResults([]);
  };

  const handleKeyPress = (event, match) => {
    if(event.key === 'Enter')
      updateTvShow(match);
  };

  return (
    <article className={ styles.results }>
      <h3><span>{ matches.length } Results:</span><span>Aired</span></h3>
      <ul>
        {
          matches.map(match => {
            const genres = match.show.genres.length ?
              `(${match.show.genres.join(', ')})` : undefined;

            return (
              <li
                key={ match.show.id }
                title={ match.show.name }
                onClick={ ()=> updateTvShow(match) }
                onKeyPress={ event => handleKeyPress(event, match) }
                tabIndex='0'
              >
                <span>{ match.show.name } { genres ? <i>{ genres }</i> : undefined }</span>
                <span>{ new Date(match.show.premiered).getFullYear() }</span>
              </li>
            )
          })
        }
      </ul>
    </article>
  );
};


Results.propTypes = {
  matches: PropTypes.array,
  setResults: PropTypes.func,
  setTVShowAll: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);