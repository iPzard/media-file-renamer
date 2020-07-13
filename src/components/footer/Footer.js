import { BackButton, NextButton, Tooltip } from 'components/footer/Buttons';

import { DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import PropTypes from 'prop-types';
import React from 'react';
import styles from 'components/footer/Footer.module.scss';

const Footer = props => {
  const { disabled, hidden } = props;

  const shouldHide = button => ({ display: hidden[button] ? 'none' : 'auto' });
  const buttonProps = { disabled, shouldHide };

  // TODO: make next and back a single "Button" component with props to determine variables
  const Next = () => (
    disabled.next ?
    <Tooltip text={ disabled.text } location={ DirectionalHint.topLeftEdge }>
      <NextButton {...buttonProps } aria-describedby='footerToolTip'/>
    </Tooltip>:
    <NextButton {...buttonProps }/>
  );

  const Back = () => (
    disabled.back ?
    <Tooltip text={ disabled.text } location={ DirectionalHint.topCenter }>
      <BackButton {...buttonProps } aria-describedby='footerToolTip'/>
    </Tooltip>:
    <BackButton {...buttonProps }/>
  );

  return (
    <footer className={ styles.footer }>
      <Back />
      <Next />
    </footer>
  )
};

Footer.propTypes = {
  disabled: PropTypes.object,
  hidden: PropTypes.object,
};

export default Footer;