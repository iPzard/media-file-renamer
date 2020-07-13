import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';

import React from 'react';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import styles from 'components/footer/Buttons.module.scss';

export const Tooltip = props => (
  <TooltipHost
    content={ props.text }
    id='footerToolTip'
    directionalHint={ props.location }
  >
    { props.children }
  </TooltipHost>
);

export const NextButton = props => (
  <PrimaryButton
    style={ props.shouldHide('next') }
    className={ styles.button }
    disabled={ props.disabled.next }
    text="Next"
  />
);

export const BackButton = props => (
  <DefaultButton
    style={ props.shouldHide('back') }
    className={ styles.button }
    disabled={ props.disabled.back }
    text="Cancel"
  />
);