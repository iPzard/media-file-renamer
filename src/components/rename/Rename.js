import React, { Component, createRef } from 'react';
import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import Controls from 'components/rename/Controls';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import NameList from 'components/rename/NameList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from 'components/rename/scss/Rename.module.scss';

class Rename extends Component {

  constructor(props) {
    super(props);
    this.scrollArea = createRef();
    this.state = {
      episodes: this.props.state.tvShow.episodes,
      fileList: this.props.state.files.fileList,
      season:  this.props.state.tvShow.season,
    };
  };


  componentDidMount() {
    const {
      props: { setRenameData },
      state: { episodes, fileList, season }
    } = this;

    setRenameData({
      files: fileList.reduce((acc, filename) => acc = [...acc, filename ], []),
      names: episodes.filter(episode => episode.season === season).map( episode => episode.name ),
    });
  };


  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.state.options.selection !== this.props.state.options.selection)
      return this.props.state.options.selection * 47;

    return null;
  };


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null)
      this.scrollArea.current.scrollTop = snapshot;
  };

  render() {

    const {
      scrollArea,
      props: {
        setRenameData,
        state: {
          options: { renameData, selection: selectedFileIndex }
        }
      }
    } = this;

    const shouldScrollY = renameData.files.length > 6 || renameData.names.length > 6;

    const listControlProps = {
      renameData,
      selectedFileIndex,
      setRenameData
    };

    return (
      <section className={ styles.rename }>
        <Header
          title='Rename files'
          description='Make sure the files are matching up the way you expect. Reorder or remove files until the names match up as desired.'
        />

        <div className={ styles.titles }>
          <h3>Current names</h3>
          <h3>New names</h3>
        </div>

        <div
          ref={ scrollArea }
          className={ shouldScrollY ? `${styles['name-display']} ${styles.scrollY}` : styles['name-display'] }
        >
          <NameList
            { ...listControlProps }
            list={ renameData.files }
            type='files'
          />

          <NameList
            { ...listControlProps }
            list={ renameData.names }
            type='names'
          />
        </div>

        <div className={ styles['controls-container'] }>
          <Controls { ...listControlProps } />
        </div>
        <Footer />
      </section>
    );
  };

};

Rename.propTypes = {
  setRenameData: PropTypes.func,
  state: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Rename);