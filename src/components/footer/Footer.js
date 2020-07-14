import { BackButton, NextButton } from 'components/footer/FooterButtons';
import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styles from 'components/footer/Footer.module.scss';

const Footer = props => {
  const {
    disabled,
    hidden,
    nextPage,
    prevPage
  } = props;

  const shouldHide = button => ({ display: hidden ? hidden[button] ? 'none' : 'auto' : 'auto' });
  const buttonProps = { disabled, shouldHide };

  return (
    <footer className={ styles.footer }>
      <BackButton {...buttonProps } onClick={ ()=> { prevPage(); console.dir(props);} }/>
      <NextButton {...buttonProps } onClick={ ()=> { nextPage(); console.dir(props);} }/>
    </footer>
  )
};

Footer.propTypes = {
  disabled: PropTypes.object,
  hidden: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);