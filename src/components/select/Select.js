import React, { useState } from 'react';

import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { PrimaryButton } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { TvIcon } from 'components/select/img/TvIcon';
import { getFiles } from 'utils/services';
import styles from 'components/select/Select.module.scss';

//import PropTypes from 'prop-types';

const Select = props => {

  const [ directory, setDirectory ] = useState({
    files: [],
    folder: ''
  });

  const handleGetFiles = () => getFiles((files, folder) => setDirectory({ files, folder }));
  const disabled = !directory.files.length ? true : false;
  console.log(props)

  return (
    <section className={ styles.select }>
      <Header
        title='Select A Folder'
        description='Select a folder on your computer that contains media files you want to rename.'
      />

      <article className={ styles['select-container'] }>
        <TextField
          label="Directory:"
          className={ styles['select-input-field'] }
          placeholder="Browse for a folder"
          onClick={ handleGetFiles }
          value={ directory.folder }
        />
        <PrimaryButton onClick={ handleGetFiles } text="Browse..." className={ styles['select-browse-button'] }/>
      </article>

      <TvIcon className={ styles.svg } />
      <Footer disabled={{ next: disabled, text: 'You must select a folder' }} hidden={{ back: true }} />
    </section>
  );
};

//Select.propTypes = { };

export default Select;