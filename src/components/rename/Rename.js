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
import Notice from 'components/dialog/Notice';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import Toast from 'components/dialog/Toast';
import { connect } from 'react-redux';
import { renameFiles } from 'utils/services';
import styles from 'components/rename/scss/Rename.module.scss';

/**
 * @namespace Rename
 * @description - Rename screen of file renamer.
 *
 * @property {Object} state - Object containing Redux mapped props.
 * @property {Object} state.renameData - Object containing updated files and names.
 * @property {string|number} state.selectedFileIndex - represents the selected file index at any given moment.
 * @property {Function} setRenameData - Function to set the renameData object.
 *
 * @todo Refactor to better compartmentalize functionality to allow for better scalability
 * @todo Add remove characters feature
 */

class Rename extends Component {

  constructor(props) {
    super(props);
    this.scrollArea = createRef();
    this.directory = this.props.state.files.directory;
    this.episodes = this.props.state.tvShow.episodes;
    this.fileList = this.props.state.files.fileList;
    this.season = this.props.state.tvShow.season;

    this.state = {
      notice: { hide: true },
      prefix: '',
      showError: { show: false, message: '' },
      showWarning: { show: false, message: '' },
      showSuccess: { show: false, message: '' },
      suffix: ''
    };
  };


  componentDidMount() {
    this.resetFileList();
  };


  getSnapshotBeforeUpdate(prevProps) {

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
    const belowScrollView = (selectedPosition <= scrollView - scrollViewSize) ||
      (selectedPosition === scrollView && prevSelectedPosition < selectedPosition);

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
    const noWarnings = !this.state.showWarning.show &&
      !this.state.showError.show &&
      !this.state.showSuccess.show;

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
    if(files.includes(missingFileText) && noWarnings)
      this.setShowToast('warning', true, notEnoughFilesWarning);

    // If all files are present and warning is showing, remove it
    else if(
      !files.includes(missingFileText) &&
      !names.includes(missingNameText) &&
      this.state.showWarning.show
    )
      this.setShowToast('warning', false);

    // Configuration for warning messages (e.g., not enough files or too many files)
    if(this.tooManyFiles(prevProps))
      this.setShowToast('warning', true, tooManyFilesWarning);

    else if(this.missingFiles(prevProps))
      this.setShowToast('warning', true, notEnoughFilesWarning);

  };

  // Custom back and/or next button functions passed to the footer
  customFunctions = {
    next: () => this.updateNotice(false)
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

    // Filter out just the names of given episodes
    let names = episodes.filter(episode => episode.season === season).map( episode => {
      return `${seasonEpisodePrefix(season, episode.number)}${episode.name}`;
     });

    // Update names to missingFileText if there are too many names vs files
    if(files.length < names.length) {
      const filesNoGaps = names.reduce((acc, _item, index) => {
        const name = index > (files.length - 1) ? missingFileText : files[index];
        console.log(index, files.length)
        acc.push(name);

        return acc;
      }, []);

      files = filesNoGaps;
    }

    // Update files to missingNameText if there are too many files vs names
    else if(files.length > names.length) {
      const namesNoGaps = files.reduce((acc, _item, index) => {
        const name = index > (names.length - 1) ? missingNameText : names[index];
        acc.push(name);

        return acc;
      }, []);

      names = namesNoGaps;
    }

    // Add extension from matching file
    names.forEach((name, index) => {

      // If file the name is matching has an extension
      if(
          /\.([a-zA-Z]|[0-9]){3,4}$/.test(files[index]) &&
          !name.includes(missingNameText)
        ) {

        // Only provide extension if it's not a 'No File' or 'Too Many Files' index
        const extension = files[index].includes(missingFileText) || name.includes(missingNameText) ?
          '' : files[index].substring(files[index].lastIndexOf('.'));

        // Piece together rename index
        names[index] = `${prefix}${name}${suffix}${extension}`

         // Replace special (unusable in folder) characters
         .replace(/\\|\/|\|/g, '-')
         .replace(/:/g, ',')
         .replace(/"/g, "'")
         .replace(/\*|\?|<|>/g, '');
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
  setShowToast = (type, show, message, callback) => {
    const toastType = type === 'warning' ? 'showWarning' :
      type === 'error' ? 'showError' : 'showSuccess';

    if(!show)
      this.setState({ [toastType]: { show: false, message: '' }}, callback || undefined);

    else
      this.setState({ [toastType]: { show, message } }, callback || undefined);
  };

  updateNotice = (hide, callback) => this.setState({ notice: { hide } }, callback || undefined);

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
      customFunctions,
      directory,
      resetFileList,
      resetUserMods,
      scrollArea,
      props: {
        setRenameData,
        state: {
          options: { renameData, selection: selectedFileIndex }
        }
      },
      setShowToast,
      state: {
        notice,
        prefix,
        showError,
        showWarning,
        showSuccess,
        suffix
      },
      updateNotice,
      updatePrefix,
      updateSuffix
    } = this;

    const shouldScrollY = renameData.files.length > 6 || renameData.names.length > 6;

    const listControlProps = {
      renameData,
      selectedFileIndex,
      setRenameData
    };

    const missingDataText = [
      missingFileText,
      missingNameText
    ];

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
          onDismiss={
            showError.show ? ()=> setShowToast('error', false) :
            showSuccess.show ? ()=> setShowToast('success', false) :
            showWarning.show ? null : null
          }
          show={
            showError.show ||
            showWarning.show ||
            showSuccess.show
          }
          type={
            showError.show ? 'error' :
            showWarning.show ? 'warning' :
            'success'
          }
        >
          {
            showError.show ? showError.message :
            showWarning.show ? showWarning.message :
            showSuccess.show ? showSuccess.message :
            null
          }
        </Toast>

        <Footer customFunctions={ customFunctions } />

        <Notice
          cancelFunc={ ()=> updateNotice(true) }
          messageText='Would you like to rename the files? This cannot be undone.'
          title='Rename files'
          okayFunc={ ()=> renameFiles(directory, renameData, missingDataText, (response) => {
              updateNotice(true,
                ()=> setShowToast(response.status, true, response.message,
                ()=> setRenameData({ ...renameData, files: response.files }, 0)
              ))
            })
          }
          hideDialog={ notice.hide }
          setHideDialog={ updateNotice }
        />
      </section>
    );
  };

};

Rename.propTypes = {
  setRenameData: PropTypes.func,
  state: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Rename);