import React, { useEffect } from 'react';

import { IconButton } from '@fluentui/react/lib/Button';
import PropTypes from 'prop-types';
import styles from 'components/rename/scss/NameList.module.scss';

const NameList = props => {

  const {
    list,
    renameData,
    setRenameData,
    type,
  } = props;

  const { files, names } = renameData;
  const missingFileText = 'File Not Found';
  const missingNameText = 'Too Many Files';

  useEffect(() => {
    if(files.length < names.length) {
      const filesNoGaps = names.reduce((acc, item, index) =>
        acc = [ ...acc, files[index] || missingFileText], []);

      setRenameData({ ...renameData, files: filesNoGaps });
    }

    else if(files.length > names.length) {
      const namesNoGaps = files.reduce((acc, item, index) =>
        acc = [ ...acc, names[index] || missingNameText], []);

      setRenameData({ ...renameData, names: namesNoGaps });
    }
  }, []);

  const UpButton = buttonProps => <IconButton
    className={ styles.button }
    iconProps={{ iconName: 'CaretUpSolid8' }}
    title="Move Up"
    ariaLabel="Move Up"
    { ...buttonProps }
  />;

  const DownButton = buttonProps => <IconButton
    className={ styles.button }
    iconProps={{ iconName: 'CaretDownSolid8' }}
    title="Move Down"
    ariaLabel="Move Down"
    { ...buttonProps }
  />;

  return (
    <article className={ styles.list }>
      <ul>
        {
          list.map((name, index) => {
            const hasNoName = name === missingFileText;
            const listProps = { key: hasNoName ? index : name };

            if(hasNoName)
              listProps.className = styles['missing-name'];

            return (<li { ...listProps }>{ hasNoName ? <span>{ name }</span> : name }</li>);
          })
        }
      </ul>
      <div className={ styles['button-container'] } data-list-type={ type }>
        <UpButton />
        <DownButton />
      </div>
    </article>
  );
};


NameList.propTypes = {
  list: PropTypes.array,
  renameData: PropTypes.object,
  setRenameData: PropTypes.func,
  type: PropTypes.string
};

export default NameList;