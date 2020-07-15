import React, { useEffect, useState } from 'react';
import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { connect } from 'react-redux';
import styles from 'components/rename/scss/Rename.module.scss';

const Rename = props => {
  const showId = props.state.tvShow.show.id;

  const [ episodes, setEpisodes ] = useState([]);

  useEffect(() => {

  }, [showId]);

  return (
    <section className={ styles.rename }>
      <Header
        title='Rename files'
        description='Make sure the files are matching up the way you expect.'
      />

      <Footer disabled={{ next: true }} />
    </section>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Rename);