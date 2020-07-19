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

class Controls extends Component {

  state = {
    hideDialog: true,
    notice: {
      cancelFunc: undefined,
      cancelText: undefined,
      messageText: undefined,
      okayFunc: undefined,
      okayText: undefined,
      title: undefined
    }
  }

  configureNotice = ({ ...args }, callback) => {
    this.setState({ notice: { ...args }}, callback || undefined);
  };

  setHideDialog = (bool, callback) => this.setState({ hideDialog: bool }, callback || undefined);

  removeFileFromList = () => {

    const {
      props: {
        renameData,
        renameData: { files },
        setRenameData,
        selectedFileIndex
      },
      setHideDialog,
    } = this;

    setHideDialog(true, ()=> {
      files[selectedFileIndex] = missingFileText;
      setRenameData(renameData, selectedFileIndex);
    });
  };

  handleButton = command => {

    const {
      configureNotice,
      props: {
        renameData,
        renameData: { files },
        selectedFileIndex,
        setRenameData
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
        setRenameData(renameData, selectedFileIndex - 1);
        break;

      case 'down':
        if(selectedFileIndex >= renameData.files.length - 1) return;
        files.swapIndices(selectedFileIndex, selectedFileIndex + 1);
        setRenameData(renameData, selectedFileIndex + 1);
        break;

      case 'delete':
        configureNotice({
          cancelFunc: ()=> setHideDialog(true),
          cancelText: 'Cancel',
          messageText: 'Do you want to remove this file from your rename list?',
          okayFunc: removeFileFromList,
          okayText: 'Confirm',
          title: 'Remove file'
        }, setHideDialog(false))
        break;

      case 'reset':
        configureNotice({
          cancelFunc: ()=> setHideDialog(true),
          cancelText: 'Cancel',
          messageText: 'Reset all changes you have made to the rename list?',
          okayFunc: ()=> setHideDialog(true, this.props.resetFileList),
          okayText: 'Confirm',
          title: 'Reset changes'
        }, setHideDialog(false))
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
          cancelText,
          messageText,
          okayFunc,
          okayText,
          title
        }
      }
    } = this;

    const ifNoFileExists = renameData.files[selectedFileIndex] === missingFileText;

    return(
      <div className={ styles.controls } >
        <TrashButton onClick={ ()=> handleButton('delete') } disabled={ ifNoFileExists }/>
        <ResetButton onClick={ ()=> handleButton('reset') } />
        <UpButton onClick={ ()=> handleButton('up') } />
        <DownButton onClick={ ()=> handleButton('down') } />

        <Notice
          cancelFunc={ cancelFunc }
          cancelText={ cancelText }
          hideDialog={ hideDialog }
          messageText={ messageText }
          okayFunc={ okayFunc }
          okayText={ okayText }
          setHideDialog={ setHideDialog }
          title={ title }
        />
      </div>
    );
  };
};


Controls.propTypes = {
  renameData: PropTypes.object,
  selectedFileIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  setRenameData: PropTypes.func
};

export default Controls;