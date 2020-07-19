import {
  MessageBar,
  MessageBarType
} from 'office-ui-fabric-react';

import PropTypes from 'prop-types';
import React from 'react';

const Toast = props => {
  const {
    children,
    onDismiss,
    show,
    type,
    ...containerProps
  } = props;

  return (
    show ?
    <aside { ...containerProps } >
      <MessageBar
        messageBarType={ MessageBarType[type] }
        isMultiline={ false }
        onDismiss={ onDismiss }
        dismissButtonAriaLabel="Close"
      >
        { children }
      </MessageBar>
    </aside> :
    null
  );
};

Toast.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onDismiss: PropTypes.func,
  show: PropTypes.bool,
  type: PropTypes.string
};

export default Toast;