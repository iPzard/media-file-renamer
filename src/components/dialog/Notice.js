import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import React, { useMemo } from 'react';

import PropTypes from 'prop-types';
import { useId } from '@uifabric/react-hooks';

export const Notice = props => {

  const {
    okayText,
    cancelText,
    okayFunc,
    cancelFunc,
    hideDialog,
    messageText,
    setHideDialog,
    title
  } = props;

  const dialogContentProps = {
    type: DialogType.normal,
    title: title,
    closeButtonAriaLabel: 'Close',
    subText: messageText,
  };

  const modalProps = useMemo(() => ({
    titleAriaId: labelId,
    subtitleAriaId: subTextId,
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  }), [labelId, subTextId]);

  // Ensure unique IDs
  const labelId = useId('dialogLabel');
  const subTextId = useId('subTextLabel');

  const toggleHideDialog = () => setHideDialog(!hideDialog);


  return (
    <aside>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={ okayFunc } text={ okayText } />
          <DefaultButton onClick={ cancelFunc } text={ cancelText } />
        </DialogFooter>
      </Dialog>
    </aside>
  );
};


Notice.propTypes = {
  okayText: PropTypes.string,
  cancelText: PropTypes.string,
  okayFunc: PropTypes.func,
  cancelFunc: PropTypes.func,
  hideDialog: PropTypes.bool,
  setHideDialog: PropTypes.func
};

export default Notice;