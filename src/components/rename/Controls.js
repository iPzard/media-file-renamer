import React, { useState } from 'react';

import { IconButton } from '@fluentui/react/lib/Button';
import Notice from 'components/dialog/Notice';
import PropTypes from 'prop-types';
import styles from 'components/rename/scss/Controls.module.scss';

const UpButton = buttonProps => <IconButton
  className={ styles.button }
  iconProps={{ iconName: 'CaretUpSolid8' }}
  title="Move Up"
  ariaLabel="Move Up"
  { ...buttonProps }
/>;

const DownButton = buttonProps => <IconButton
  className={ styles.button }
  iconProps={{ iconName: 'CaretDownSolid8' }}
  title="Move Down"
  ariaLabel="Move Down"
  { ...buttonProps }
/>;

const TrashButton = buttonProps => <IconButton
  iconProps={{ iconName: 'Delete' }}
  title="Remove"
  ariaLabel="Remove"
  { ...buttonProps }
/>;


const Controls = props => {
  const [hideDialog, setHideDialog] = useState(true);

  const {
    renameData,
    selectedFileIndex,
    setRenameData
  } = props;

  const { files } = renameData;

  const handleButton = command => {

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
        setHideDialog(false);

      default:
        return;
    }
  };

  return(
    <div className={ styles.controls } >
      <TrashButton onClick={ ()=> handleButton('delete') }/>
      <UpButton onClick={ ()=> handleButton('up') } />
      <DownButton onClick={ ()=> handleButton('down') } />

      <Notice
        cancelFunc={ ()=>{} } // Don't forget to setHideDialog w/this func
        cancelText='Cancel'
        hideDialog={ hideDialog }
        messageText='Do you want to remove this file from your rename list?'
        okayFunc={ ()=>{} } // Don't forget to setHideDialog w/this func
        okayText='Confirm'
        setHideDialog={ setHideDialog }
        title='Remove file'
      />
    </div>
  );
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