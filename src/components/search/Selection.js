import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import PropTypes from 'prop-types';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { connect } from 'react-redux';
import styles from 'components/search/scss/Selection.module.scss';

const Selection = props => {

  const {
    setSeason,
    state: { season, episodes },
    tvShow,
  } = props;

  const lastSeason = !episodes.length ? 0 : episodes[episodes.length - 1].season;
  const increment = () => season !== lastSeason ? setSeason(season + 1) : undefined;
  const decrement = () => season > 1 ? setSeason(season - 1) : undefined;


  return (
    <section className={ styles.selection }>
      <article>
        <img src={ tvShow.show.image.medium } alt='TV Show Poster' />
        <div className={ styles.description } >
          <h3>{ tvShow.show.name }</h3>
          <div className={ tvShow.show.summary ? styles.active : styles.inactive }>
            {
              tvShow.show.summary ?
              ReactHtmlParser(tvShow.show.summary) :
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
  tvShow: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(Selection);