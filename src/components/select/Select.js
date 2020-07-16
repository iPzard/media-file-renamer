import { mapDispatchToProps, mapStateToProps } from 'state/dispatch';

import { FolderOpenIcon } from 'components/select/icons/FolderOpenIcon';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { PrimaryButton } from 'office-ui-fabric-react';
import PropTypes from 'prop-types';
import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { connect } from 'react-redux';
import { getFiles } from 'utils/services';
import styles from 'components/select/scss/Select.module.scss';

const Select = props => {
  const { setFiles, setDirectory } = props;

  const disabled = !props.state.files.fileList.length ? true : false;

  const handleGetFiles = () => getFiles((fileList, directory) => {
    setDirectory(directory)
    setFiles(fileList);
  });

  return (
    <section className={ styles.select }>
      <Header
        title='Select Folder'
        description='Select a folder on your computer that contains media files you want to rename.'
      />

      <article className={ styles['select-container'] }>
        <TextField
          label="Directory:"
          className={ styles['select-input-field'] }
          placeholder="Browse for a folder"
          onClick={ handleGetFiles }
          value={ props.state.files.directory }
        />
        <PrimaryButton onClick={ handleGetFiles } text="Browse..." className={ styles['select-browse-button'] }/>
      </article>

      <FolderOpenIcon className={ styles.svg }/>

      <Footer disabled={{ next: disabled }} hidden={{ back: true }} />
    </section>
  );
};

Select.propTypes = {
  setDirectory: PropTypes.func,
  setFiles: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);