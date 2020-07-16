import React, { useState } from 'react';
import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import NameList from 'components/rename/NameList';
import { connect } from 'react-redux';
import styles from 'components/rename/scss/Rename.module.scss';

const Rename = props => {
  const {
    state: {
      episodes,
      files: { directory, fileList },
      season
    }
  } = props;

  const [ renameData, setRenameData ] = useState({
    files: fileList.reduce((acc, filename) => acc = [...acc, filename ], []),
    names: episodes.filter(episode => episode.season === season).map( episode => episode.name )
  });

  const shouldScrollY = renameData.files.length > 7 || renameData.names.length > 7;

  return (
    <section className={ styles.rename }>
      <Header
        title='Rename files'
        description='Make sure the files are matching up the way you expect. Reorder any '
      />
      <div className={ styles.titles }>
        <h3>Current names</h3>
        <h3>New names</h3>
      </div>
      <div className={ shouldScrollY ? `${styles['name-display']} ${styles.scrollY}` : styles['name-display'] }>
        <NameList
          list={ renameData.files }
          renameData={ renameData }
          setRenameData={ setRenameData }
          type='files'
        />

        <NameList
          list={ renameData.names }
          renameData={ renameData }
          setRenameData={ setRenameData }
          type='names'
        />
      </div>
      <Footer />
    </section>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Rename);