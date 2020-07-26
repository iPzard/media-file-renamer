import { IconButton } from '@fluentui/react/lib/Button';
import React from 'react';
import styles from 'components/rename/scss/ControlButtons.module.scss';

/**
 * @description - Generic notice component to display messages to the end user.
 *
 * @property {Object} iconProps - Object containing the corresponding icon's data
 * @tutorial - https://material-ui.com/api/icon-button/
 */

export const DownButton = props => <IconButton
  className={ styles.button }
  iconProps={{ iconName: 'CaretDownSolid8' }}
  title="Move Down"
  ariaLabel="Move Down"
  { ...props }
/>;

export const UpButton = props => <IconButton
  className={ styles.button }
  iconProps={{ iconName: 'CaretUpSolid8' }}
  title="Move Up"
  ariaLabel="Move Up"
  { ...props }
/>;

export const ResetButton = props => <IconButton
  className={ styles.button }
  iconProps={{ iconName: 'Refresh' }}
  title="Reset"
  ariaLabel="Reset"
  { ...props }
/>;

export const TrashButton = props => <IconButton
  className={ styles.button }
  iconProps={{ iconName: 'Delete' }}
  title="Remove"
  ariaLabel="Remove"
  { ...props }
/>;