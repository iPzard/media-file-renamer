import { BackButton, NextButton } from 'components/footer/FooterButtons';
import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styles from 'components/footer/scss/Footer.module.scss';

const Footer = props => {
  const {
    disabled,
    hidden,
    nextPage,
    prevPage,
    skip = { back: 0, next: 0 }
  } = props;

  const shouldHide = button => ({ display: hidden ? hidden[button] ? 'none' : 'auto' : 'auto' });
  const buttonProps = { disabled, shouldHide };

  return (
    <footer className={ styles.footer }>
      <BackButton {...buttonProps } onClick={ ()=> prevPage(skip.back) }/>
      <NextButton {...buttonProps } onClick={ ()=> nextPage(skip.forward) }/>
    </footer>
  )
};

Footer.propTypes = {
  disabled: PropTypes.object,
  hidden: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);