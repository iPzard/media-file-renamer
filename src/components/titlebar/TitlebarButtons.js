import { IconButton } from '@fluentui/react/lib/Button';
import React from 'react';
import styles from 'components/titlebar/scss/TitlebarButtons.module.scss';

/**
 * @description Title Component to use as an Electron customized titlebar.
 *
 * @member { id } electron-window-title-text used in main.js to set opacity on/off focus.
 * @member { id } electron-window-title-buttons used in main.js to set opacity on/off focus.
 */

export const MinimizeButton = props => (
  <IconButton
    className={ styles.button }
    iconProps={{ iconName: 'ChromeMinimize' }}
    title="Minimize"
    ariaLabel="Minimize"
    { ...props }
  />
);

export const MaximizeButton = props => (
  <IconButton
    className={ styles.button }
    iconProps={{ iconName: 'Checkbox' }}
    title="Maximize"
    ariaLabel="Maximize"
    { ...props }
  />
);

export const ContractButton = props => (
  <IconButton
    className={ styles.button }
    iconProps={{ iconName: 'MiniContract' }}
    title="Unmaximize"
    ariaLabel="Unmaximize"
    { ...props }
  />
);

export const CloseButton = props => (
  <IconButton
    className={ styles.button }
    iconProps={{ iconName: 'ChromeClose' }}
    title="Close"
    ariaLabel="Close"
    { ...props }
  />
);