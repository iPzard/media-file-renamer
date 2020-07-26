import { IconButton } from '@fluentui/react/lib/Button';
import React from 'react';
import styles from 'components/rename/scss/ControlButtons.module.scss';

/**
 * @description - Buttons to navigate the rename file list.
 * @tutorial - https://material-ui.com/api/icon-button/
 * @memberof Controls
 */

/**
 * @description - Button to navigate down in the rename file list.
 * @memberof Controls
 */
export const DownButton = props => <IconButton
  className={ styles.button }
  iconProps={{ iconName: 'CaretDownSolid8' }}
  title="Move Down"
  ariaLabel="Move Down"
  { ...props }
/>;

/**
 * @description - Button to navigate up in the rename file list.
 * @memberof Controls
 */
export const UpButton = props => <IconButton
  className={ styles.button }
  iconProps={{ iconName: 'CaretUpSolid8' }}
  title="Move Up"
  ariaLabel="Move Up"
  { ...props }
/>;

/**
 * @description - Button to reset the rename file list.
 * @memberof Controls
 */
export const ResetButton = props => <IconButton
  className={ styles.button }
  iconProps={{ iconName: 'Refresh' }}
  title="Reset"
  ariaLabel="Reset"
  { ...props }
/>;

/**
 * @description - Button to remove a name from the rename file list.
 * @memberof Controls
 */
export const TrashButton = props => <IconButton
  className={ styles.button }
  iconProps={{ iconName: 'Delete' }}
  title="Remove"
  ariaLabel="Remove"
  { ...props }
/>;