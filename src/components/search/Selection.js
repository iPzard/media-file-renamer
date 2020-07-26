import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import PropTypes from 'prop-types';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { connect } from 'react-redux';
import styles from 'components/search/scss/Selection.module.scss';

/**
 * @description - Selection page to show selected matching TV show data.
 *
 * @property {function} setSeason - Function to update the selected season in the Redux store.
 * @property {Object} state - Object containing Redux mapped props.
 * @property {Array.<Object>} state.tvShow.episodes - Array of objects for episodes from matching TV show.
 * @property {number} state.tvShow.season - Number which represents selected season
 * @property {Object} tvShowData - Object containing detailed information about matching TV show.
 */

const Selection = props => {

  const {
    setSeason,
    state: { tvShow: { episodes, season, tvShowData } },
  } = props;

  const lastSeason = !episodes ? 0 : episodes[episodes.length - 1].season;
  const increment = () => season !== lastSeason ? setSeason(season + 1) : undefined;
  const decrement = () => season > 1 ? setSeason(season - 1) : undefined;


  return (
    <section className={ styles.selection }>
      <article>
        <img src={ tvShowData.show.image.medium } alt='TV Show Poster' />
        <div className={ styles.description } >
          <h3>{ tvShowData.show.name }</h3>
          <div className={ tvShowData.show.summary ? styles.active : styles.inactive }>
            {
              tvShowData.show.summary ?
              ReactHtmlParser(tvShowData.show.summary) :
              <h1>No description</h1>
            }
          </div>
        </div>

        <h4>Select season:</h4>
        <SpinButton
          min={ 1 }
          max={ lastSeason }
          value={ season }
          inputProps={{ min: `${1}`, max: `${lastSeason}` }}
          onIncrement={ increment }
          onDecrement={ decrement }
        />
      </article>
    </section>
  );
};

Selection.propTypes = {
  setSeason: PropTypes.func,
  state: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Selection);