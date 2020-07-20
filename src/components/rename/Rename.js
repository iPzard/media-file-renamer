import React, { Component, createRef } from 'react';
import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';
import { missingFileText, missingNameText, seasonEpisodePrefix } from 'utils/constants';

import Controls from 'components/rename/Controls';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import NameList from 'components/rename/NameList';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import Toast from 'components/dialog/Toast';
import { connect } from 'react-redux';
import styles from 'components/rename/scss/Rename.module.scss';

// TODO: show file extensions on new names list
// Remove any special characters from new names list

class Rename extends Component {

  constructor(props) {
    super(props);
    this.scrollArea = createRef();
    this.episodes = this.props.state.tvShow.episodes;
    this.fileList = this.props.state.files.fileList;
    this.season = this.props.state.tvShow.season;

    this.state = {
      showWarning: {
        show: false,
        message: ''
      },
      prefix: '',
      suffix: ''
    };
  };


  componentDidMount() {
    this.resetFileList();
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
    if (
      aboveScrollView || belowScrollView
    ) {
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
    if (snapshot !== null)
      this.scrollArea.current.scrollTop = snapshot;

    if(prevState.prefix !== this.state.prefix || prevState.suffix !== this.state.suffix)
      this.resetFileList();


    // Configuration for warning messages (e.g., not enough files or too many files)
    if(this.tooManyFiles(prevProps)) {
      this.setState({
        showWarning: {
          show: true,
          message: `Files matching with '${missingNameText}' it will not be renamed.`
        }
      });
    }

    else if(this.missingFiles(prevProps)) {
      this.setState({
        showWarning: {
          show: true,
          message: `Not enough files, new names matching '${missingFileText}' it will not be used.`
        }
      });
    }

  };


  resetFileList = (selection = 0) => {
    const {
      episodes,
      fileList,
      props: { setRenameData },
      season,
      state: { prefix, suffix }
    } = this;

    let files = fileList.reduce((acc, filename) => acc = [...acc, filename ], []);
    let names = episodes.filter(episode => episode.season === season).map( episode => {
      return `${prefix}${seasonEpisodePrefix(season, episode.number)}${episode.name}${suffix}`;
     });

    if(files.length < names.length) {
      const filesNoGaps = names.reduce((acc, item, index) =>
        acc = [ ...acc, files[index] || missingFileText], []);

      files = filesNoGaps;
    }

    else if(files.length > names.length) {
      const namesNoGaps = files.reduce((acc, item, index) =>
        acc = [ ...acc, names[index] || missingNameText], []);

      names = namesNoGaps;
    }

    // Set data to files and current season (including user-added prefix/suffix)
    setRenameData({ files, names }, selection);
  };

  resetUserMods = callback => this.setState({ prefix: '', suffix: '' }, callback || undefined);

  // Check if there's 'Too Many Files' text here now, and wasn't previously
  tooManyFiles = prevProps => {
    const currentFilesHaveText = this.props.state.options.renameData.names.includes(missingNameText);
    const prevFilesHaveText = prevProps.state.options.renameData.names.includes(missingNameText);
    return currentFilesHaveText && !prevFilesHaveText;
  };

  // Check if there's 'No File' text here now, and wasn't previously
  missingFiles = prevProps => {
    const currentNamesHaveText = this.props.state.options.renameData.files.includes(missingFileText);
    const prevNamesHaveText = prevProps.state.options.renameData.files.includes(missingFileText);
    return currentNamesHaveText && !prevNamesHaveText;
  }

  updatePrefix = event => {
    this.setState({ prefix: event.target.value }, ()=> this.resetFileList(this.props.state.options.selection));
  };

  updateSuffix = event => {
    this.setState({ suffix: event.target.value }, ()=> this.resetFileList(this.props.state.options.selection));
  };

  render() {

    const {
      resetFileList,
      resetUserMods,
      scrollArea,
      props: {
        setRenameData,
        state: {
          options: { renameData, selection: selectedFileIndex }
        }
      },
      state: {
        prefix,
        showWarning,
        suffix
      },
      updatePrefix,
      updateSuffix
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
          description='You can reorder or remove files until the names match up the way you want, you can also add a prefix and/or suffix to the new names.'
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
          <Controls { ...listControlProps } resetFileList={ resetFileList } resetUserMods={ resetUserMods } />
        </div>

        <div className={ styles['modifications-container']}>
          <TextField
            label='Prefix'
            onChange={ updatePrefix }
            placeholder='Add prefix to new names'
            value={ prefix }
          />

          <TextField
            label='Suffix'
            onChange={ updateSuffix }
            placeholder='Add suffix to new names'
            value={ suffix }
          />
        </div>

        <Toast
          messageBarType='warning'
          // TODO: allow dismiss, but prevent it from offsetting scroll
          //onDismiss={ ()=> this.setState({ showWarning: { show: false, message: '' } }) }
          show={ showWarning.show }
          type='warning'
        >
          { showWarning.message }
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