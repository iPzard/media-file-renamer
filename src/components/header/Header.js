import PropTypes from 'prop-types';
import React from 'react';
import styles from 'components/header/scss/Header.module.scss';

const Header = props => {
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