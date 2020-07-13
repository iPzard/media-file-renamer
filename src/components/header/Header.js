import PropTypes from 'prop-types';
import React from 'react';
import styles from 'components/header/Header.module.scss';

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
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
};

export default Header;