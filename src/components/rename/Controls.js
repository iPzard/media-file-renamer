import {
  DownButton,
  ResetButton,
  TrashButton,
  UpButton
} from 'components/rename/ControlButtons';
import React, { Component } from 'react';

import Notice from 'components/dialog/Notice';
import PropTypes from 'prop-types';
import { missingFileText } from 'utils/constants';
import styles from 'components/rename/scss/Controls.module.scss';

/**
 * @namespace Controls
 * @description - Controls for file name navigation, deletion, and restoration.
 *
 * @property {Object} renameData - Object containing updated files and names.
 * @property {Function} resetFileList - Function to reset lists of files to original.
 * @property {Function} resetUserMods - Function to remove user modifications to prefix/suffix/etc..
 * @property {string|number} selectedFileIndex - represents the selected file index at any given moment.
 */


class Controls extends Component {

  state = {
    hideDialog: true,
    notice: {
      cancelFunc: undefined,
      messageText: undefined,
      okayFunc: undefined,
      title: undefined
    },
    updated: false
  }

  configureNotice = ({ ...args }, callback) => {
    this.setState({ notice: { ...args }}, callback || undefined);
  };

  setHideDialog = (bool, callback) => this.setState({ hideDialog: bool }, callback || undefined);

  removeFileFromList = () => {

    const {
      props: {
        renameData: { files },
        resetFileList,
        selectedFileIndex
      },
      setHideDialog,
    } = this;

    setHideDialog(true, ()=> {
      files[selectedFileIndex] = missingFileText;

      resetFileList(selectedFileIndex, true);
    });
  };

  handleButton = command => {

    const {
      configureNotice,
      props: {
        renameData,
        renameData: { files },
        resetFileList,
        resetUserMods,
        selectedFileIndex
      },
      removeFileFromList,
      setHideDialog,
    } = this;

    if(!Array.prototype.hasOwnProperty('swapIndices')) {
      Array.prototype.swapIndices = function(indexA, indexB) {
        this[indexA] = this.splice(indexB, 1, this[indexA])[0];
        return this;
      };
    }

    switch(command) {
      case 'up':
        if(selectedFileIndex <= 0) return;
        files.swapIndices(selectedFileIndex, selectedFileIndex - 1);
        this.setState({ updated: true }, resetFileList(selectedFileIndex - 1, true));
        //setRenameData(renameData, selectedFileIndex - 1);
        break;

      case 'down':
        if(selectedFileIndex >= renameData.files.length - 1) return;
        files.swapIndices(selectedFileIndex, selectedFileIndex + 1);
        this.setState({ updated: true }, resetFileList(selectedFileIndex + 1, true));
        //setRenameData(renameData, selectedFileIndex + 1);
        break;

      case 'delete':
        this.setState({ updated: true }, configureNotice({
          cancelFunc: ()=> setHideDialog(true),
          messageText: 'Do you want to remove this file from your rename list?',
          okayFunc: removeFileFromList,
          title: 'Remove file'
        }, setHideDialog(false)));
        break;

      case 'reset':
        this.setState({ updated: false }, configureNotice({
          cancelFunc: ()=> setHideDialog(true),
          messageText: 'Reset all changes you have made to the rename list?',
          okayFunc: ()=> setHideDialog(true, ()=> resetUserMods(resetFileList)),
          title: 'Reset changes'
        }, setHideDialog(false)))
        break;

      default:
        return;
    }
  };

  render() {

    const {
      handleButton,
      setHideDialog,
      props: {
        renameData,
        selectedFileIndex,
      },
      state: {
        hideDialog,
        notice: {
          cancelFunc,
          messageText,
          okayFunc,
          title
        },
        updated
      }
    } = this;

    const ifNoFileExists = renameData.files[selectedFileIndex] === missingFileText;

    return(
      <div className={ styles.controls } >
        <TrashButton onClick={ ()=> handleButton('delete') } disabled={ ifNoFileExists }/>
        <ResetButton onClick={ ()=> handleButton('reset') } disabled={ !updated }/>
        <UpButton onClick={ ()=> handleButton('up') } />
        <DownButton onClick={ ()=> handleButton('down') } />

        <Notice
          cancelFunc={ cancelFunc }
          hideDialog={ hideDialog }
          messageText={ messageText }
          okayFunc={ okayFunc }
          setHideDialog={ setHideDialog }
          title={ title }
        />
      </div>
    );
  };
};


Controls.propTypes = {
  renameData: PropTypes.object,
  resetFileList: PropTypes.func,
  resetUserMods: PropTypes.func,
  selectedFileIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default Controls;