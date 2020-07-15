import { IconButton } from '@fluentui/react/lib/Button';
import React from 'react';
import styles from 'components/titlebar/scss/TitlebarButtons.module.scss';

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