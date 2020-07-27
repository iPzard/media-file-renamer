import { BackButton, NextButton } from 'components/footer/FooterButtons';
import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styles from 'components/footer/scss/Footer.module.scss';

/**
 * @namespace Footer
 * @description - Generic footer component to display child content to the end user.
 *
 * @property {Object} customFunctions - Object of custom `Back` and `Next` button functions.
 * @property {Object} disabled - Object of next and back `disabled` state configuration.
 * @property {Object} hidden - Object of next and back `hidden` (display) state configuration.
 * @property {Function} nextPage - Function to execute when the primary (next) button is clicked.
 * @property {Function} prevPage - Function to execute when the secondary (back) button is clicked.
 */

const Footer = props => {
  const {
    customFunctions,
    disabled,
    hidden,
    nextPage,
    prevPage,
  } = props;

  // Check for custom functions
  const custom = { ...customFunctions }; // Cleaner than using a default prop above
  const handleBack = () => custom.hasOwnProperty('back') ? custom.back() : prevPage();
  const handleNext = () => custom.hasOwnProperty('next') ? custom.next() : nextPage();

  const shouldHide = button => ({ display: hidden ? hidden[button] ? 'none' : 'auto' : 'auto' });
  const buttonProps = { disabled, shouldHide };

  return (
    <footer className={ styles.footer }>
      <BackButton { ...buttonProps } onClick={ handleBack }/>
      <NextButton { ...buttonProps } onClick={ handleNext }/>
    </footer>
  )
};

Footer.propTypes = {
  customFunctions: PropTypes.object,
  disabled: PropTypes.object,
  hidden: PropTypes.object,
  nextPage: PropTypes.func,
  prevPage: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);