import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';

import React from 'react';
import styles from 'components/footer/FooterButtons.module.scss';

export const NextButton = props => (
  <PrimaryButton
    className={ styles.button }
    disabled={ props.disabled ? props.disabled.next : false }
    onClick={ props.onClick }
    style={ props.shouldHide('next') }
    text="Next"
  />
);

export const BackButton = props => (
  <DefaultButton
    className={ styles.button }
    disabled={ props.disabled ? props.disabled.back : false }
    onClick={ props.onClick }
    style={ props.shouldHide('back') }
    text="Back"
  />
);