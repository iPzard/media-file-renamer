import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getEpisodeList } from 'utils/api';
import styles from 'components/search/scss/Results.module.scss';

const Results = props => {
  const {
    matches,
    setEpisodes,
    setSeason,
    setTvShow
  } = props;

  const updateTvShow = match => {
    getEpisodeList(match.show.id, episodes => setEpisodes(episodes));
    setTvShow(match);
    setSeason(1);
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
  setEpisodes: PropTypes.func,
  setSeason: PropTypes.func,
  setTvShow: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);