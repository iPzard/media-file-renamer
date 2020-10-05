import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';

import React from 'react';
import styles from 'components/footer/scss/FooterButtons.module.scss';

/**
 * @description - Generic button components to use in the Footer component.
 *
 * @property {boolean} disabled - Boolean to decide the button's `disabled` state.
 * @property {string} text - Text to display on the button.
 * @tutorial - https://developer.microsoft.com/en-us/fluentui#/controls/web/button
 * @memberof Footer
 *
 * @todo Add prop types to these, and export after declaration
 */

export const NextButton = (props) => (
  <PrimaryButton
    className={ styles.button }
    disabled={ props.disabled ? props.disabled.next : false }
    onClick={ props.onClick }
    style={ props.shouldHide('next') }
    text="Next"
  />
);

export const BackButton = (props) => (
  <DefaultButton
    className={ styles.button }
    disabled={ props.disabled ? props.disabled.back : false }
    onClick={ props.onClick }
    style={ props.shouldHide('back') }
    text="Back"
  />
);