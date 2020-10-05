import PropTypes from 'prop-types';
import React from 'react';
import styles from 'components/header/scss/Header.module.scss';

/**
 * @namespace Header
 * @description - Generic header component to display child content to the end user.
 *
 * @property {string} description - String to use as the header description.
 * @property {string} title - String to use as the Header component's main header (H1).
 */

const Header = (props) => {
  const { description, title } = props;

  return (
    <header className={ styles.header }>
      <h1>{ title }</h1>
      <p>{ description }</p>
      { props.children }
    </header>
  )
};

Header.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;