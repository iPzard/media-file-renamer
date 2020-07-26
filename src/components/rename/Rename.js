import React, { Component, createRef } from 'react';
import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';
import {
  missingFileText,
  missingNameText,
  notEnoughFilesWarning,
  seasonEpisodePrefix,
  tooManyFilesWarning
} from 'utils/constants';

import Controls from 'components/rename/Controls';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import NameList from 'components/rename/NameList';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import Toast from 'components/dialog/Toast';
import { connect } from 'react-redux';
import styles from 'components/rename/scss/Rename.module.scss';

/**
 * @description - Rename screen of file renamer.
 *
 * @property {Object} state - Object containing Redux mapped props.
 * @property {Object} state.renameData - Object containing updated files and names.
 * @property {string|number} state.selectedFileIndex - represents the selected file index at any given moment.
 * @property {function} setRenameData - Function to set the renameData object.
 */

// TODO: Give 'names' index that matches 'No File' and 'files' index that matches across from 'Too Many Files'
// a disabled looking state..
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
    if (aboveScrollView || belowScrollView) {
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

    const files = this.props.state.options.renameData.files;
    const names = this.props.state.options.renameData.names;

    // If selected item scrollTop in snapshot, set it
    if (snapshot !== null)
      this.scrollArea.current.scrollTop = snapshot;

    // If the prefix or suffix changed, update the list
    if(
      prevState.prefix !== this.state.prefix ||
      prevState.suffix !== this.state.suffix
    )
      this.resetFileList(0, true);

    // If there are not enough files and the warning isn't showing, show it
    if(
      files.includes(missingFileText) &&
      !this.state.showWarning.show
    )
      this.setShowWarning(true, notEnoughFilesWarning);

    // If all files are present and warning is showing, remove it
    else if(
      !files.includes(missingFileText) &&
      !names.includes(missingNameText) &&
      this.state.showWarning.show
    )
      this.setShowWarning(false);

    // Configuration for warning messages (e.g., not enough files or too many files)
    if(this.tooManyFiles(prevProps))
      this.setShowWarning(true, tooManyFilesWarning);

    else if(this.missingFiles(prevProps))
      this.setShowWarning(true, notEnoughFilesWarning);

  };


  resetFileList = (selection = 0, updating) => {
    const {
      episodes,
      fileList,
      props: { setRenameData },
      season,
      state: { prefix, suffix }
    } = this;

    // Determine whether to reset, or just updating (keeping 'No File' indexes)
    let files = updating ?
      this.props.state.options.renameData.files.reduce((acc, filename) => acc = [...acc, filename ], []) :
      fileList.reduce((acc, filename) => acc = [...acc, filename ], []);

    let names = episodes.filter(episode => episode.season === season).map( episode => {
      return `${seasonEpisodePrefix(season, episode.number)}${episode.name}`;
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

    // Add extension from matching file
    names.forEach((name, index) => {

      // If file the name is matching has an extension
      if(
          /\.[a-zA-Z][a-zA-Z][a-zA-Z]$/.test(files[index]) ||
          files[index].includes(missingFileText)
        ) {

        // Only provide extension if it's not a 'No File' or 'Too Many Files' index
        const extension = files[index].includes(missingFileText) || names[index].includes(missingNameText) ?
          '': files[index].substring(files[index].lastIndexOf('.'));

        // Piece together rename index
        // TODO: Remove any special characters from new names list (use replace())
        names[index] = `${prefix}${names[index]}${suffix}${extension}`;
      }
    });

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
  };


  // Method to set or unset the page warnings
  setShowWarning = (show, message) => {
    if(!show)
      this.setState({ showWarning: { show: false, message: '' }});

    else
      this.setState({ showWarning: { show, message } });
  };

  // Method to update user added prefix
  updatePrefix = event => {
    this.setState({ prefix: event.target.value }, ()=> this.resetFileList(this.props.state.options.selection, true));
  };

  // Method to update user added suffix
  updateSuffix = event => {
    this.setState({ suffix: event.target.value }, ()=> this.resetFileList(this.props.state.options.selection, true));
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
          <Controls
            { ...listControlProps }
            resetFileList={ resetFileList }
            resetUserMods={ resetUserMods }
          />
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