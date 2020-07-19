import React, { Component, createRef } from 'react';
import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import Controls from 'components/rename/Controls';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import NameList from 'components/rename/NameList';
import PropTypes from 'prop-types';
import Toast from 'components/dialog/Toast';
import { connect } from 'react-redux';
import { missingNameText } from 'utils/constants';
import styles from 'components/rename/scss/Rename.module.scss';

class Rename extends Component {

  constructor(props) {
    super(props);
    this.scrollArea = createRef();
    this.state = {
      episodes: this.props.state.tvShow.episodes,
      fileList: this.props.state.files.fileList,
      season:   this.props.state.tvShow.season,
      showWarning: false
    };
  };


  componentDidMount() {
    const {
      props: { setRenameData },
      state: { episodes, fileList, season }
    } = this;

    // Set data to just files and current season
    setRenameData({
      files: fileList.reduce((acc, filename) => acc = [...acc, filename ], []),
      names: episodes.filter(episode => episode.season === season).map( episode => episode.name ),
    });
  };


  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Line and scrollable area dimensions
    const lineHeight = 47, rows = 6;
    const scrollViewSize = lineHeight * rows;

    // Props to declarations
    const selection = this.props.state.options.selection;
    const prevSelection = prevProps.state.options.selection;
    const scrollAreaScrollTop = this.scrollArea.current.scrollTop;

    // Size of viewable area and position of selected & prev selected items
    const scrollView = scrollAreaScrollTop + scrollViewSize;
    const selectedPosition = selection * lineHeight;
    const prevSelectedPosition = prevSelection * lineHeight;

    // Determining if below or above viewable area
    const aboveScrollView = selectedPosition > scrollView;
    const belowScrollView = selectedPosition <= scrollView - scrollViewSize ||
      selectedPosition === scrollView && prevSelectedPosition < selectedPosition;

    // If out of view, return selected item scroll top
    if (aboveScrollView || belowScrollView || this.tooManyFiles(prevProps)) {
      return selectedPosition;
    }

    // Resolves a few edge-cases
    else if(
      selectedPosition > scrollViewSize &&
      prevSelection === selection - 1 &&
      Number.isInteger(prevSelectedPosition / scrollViewSize) &&
      Number.isInteger(scrollAreaScrollTop / scrollViewSize)
    ) {
      return selectedPosition - lineHeight;
    }

    return null;
  };


  componentDidUpdate(prevProps, prevState, snapshot) {

    // If selected item scrollTop in snapshot, set it
    if (snapshot !== null) {
      this.scrollArea.current.scrollTop = snapshot;
    }

    // If there are too many files now, but not in prev props, show notice
    if(this.tooManyFiles(prevProps))
      this.setState({ showWarning: true });
  };


  resetFileList = () => {
    const {
      props: { setRenameData },
      state: { fileList }
    } = this;

    // Reset data to it's original state
    setRenameData({
      files: fileList.reduce((acc, filename) => acc = [...acc, filename ], []),
      names: [ ...this.props.state.options.renameData.names ]
    });
  };


  // Check if there's "Too Many Files" text here now, and wasn't previously
  tooManyFiles = prevProps => {
    const currentFilesHaveText = this.props.state.options.renameData.names.includes(missingNameText);
    const prevFilesHaveText = prevProps.state.options.renameData.names.includes(missingNameText);
    return currentFilesHaveText && !prevFilesHaveText;
  };


  render() {

    const {
      resetFileList,
      scrollArea,
      props: {
        setRenameData,
        state: {
          options: { renameData, selection: selectedFileIndex }
        }
      },
      state: { showWarning }
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
          description={ `Make sure the files are matching up the way you expect. Reorder or remove files until the names match up as desired.` }
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
          <Controls { ...listControlProps } resetFileList={ resetFileList }/>
        </div>

        <Toast
          messageBarType='warning'
          onDismiss={ ()=> this.setState({ showWarning: false }) }
          show={ showWarning }
          type='warning'
        >
          { `Files matching with "${missingNameText}" it will not be renamed.` }
        </Toast>

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