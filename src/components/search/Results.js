import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styles from 'components/search/Results.module.scss';

const Results = props => {
  const { matches } = props;

  return (
    <div className={ styles.results }>
      <table>
        <thead>
          <tr>
            <th>TV Show</th>
            <th>Genre(s)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            matches.map(match => (
              <tr key={ match.show.id } title={ match.show.name }>
                <td>{ match.show.name }</td>
                <td>{ match.show.genres.join(', ') }</td>
                <td>{ match.show.status }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
};

Results.propTypes = {
  matches: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);