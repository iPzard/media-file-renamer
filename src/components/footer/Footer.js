import { BackButton, NextButton } from 'components/footer/FooterButtons';
import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styles from 'components/footer/scss/Footer.module.scss';

/**
 * @description - Generic footer component to display child content to the end user.
 *
 * @property {Object} disabled - Object of next and back `disabled` state configuration.
 * @property {Object} hidden - Object of next and back `hidden` (display) state configuration.
 * @property {function} nextPage - Function to execute when the primary (next) button is clicked.
 * @property {function} prevPage - Function to execute when the secondary (back) button is clicked.
 *
 * @todo - Allow custom function to be passed and used if provided.. Instead of prevPage/nextPage
 * This will also be used to make back button show results from "match" page of search
 */

const Footer = props => {
  const {
    disabled,
    hidden,
    nextPage,
    prevPage,
  } = props;

  const shouldHide = button => ({ display: hidden ? hidden[button] ? 'none' : 'auto' : 'auto' });
  const buttonProps = { disabled, shouldHide };

  return (
    <footer className={ styles.footer }>
      <BackButton {...buttonProps } onClick={ ()=> prevPage() }/>
      <NextButton {...buttonProps } onClick={ ()=> nextPage() }/>
    </footer>
  )
};

Footer.propTypes = {
  disabled: PropTypes.object,
  hidden: PropTypes.object,
  nextPage: PropTypes.func,
  prevPage: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);