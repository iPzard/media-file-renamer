import React, { useEffect } from 'react';
import { missingFileText, missingNameText } from 'utils/constants';

import PropTypes from 'prop-types';
import styles from 'components/rename/scss/NameList.module.scss';

const NameList = props => {

  const {
    list,
    renameData,
    renameData: { files, names },
    selectedFileIndex,
    setRenameData,
    type
  } = props;


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
  }, [files, names]);

  const handleClick = index => type === 'files' ? setRenameData(renameData, index) : undefined;

  return (
    <article className={ styles.list }>
      <ul data-list-type={ type } >
        {
          list.map((name, index) => {
            const hasNoName = name === missingFileText || name === missingNameText;
            const selected = selectedFileIndex === index && type === 'files';
            const listProps = { key: hasNoName ? `${type}-${index}` : `${type}-${name}` };

            if(hasNoName && selected) {
              listProps.className = `${styles['missing-name']} ${styles['selected-file']}`;
            }

            else if(selected) {
              listProps.className = styles['selected-file'];
            }

            else if(hasNoName) {
              listProps.className = styles['missing-name'];
            }

            return (
              <li { ...listProps } onClick={ ()=> handleClick(index) }>
                { hasNoName ? <span className={ styles['message'] }>{ name }</span> : name }
              </li>
            );
          })
        }
      </ul>
    </article>
  );
};


NameList.propTypes = {
  list: PropTypes.array,
  renameData: PropTypes.object,
  selectedFileIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  setRenameData: PropTypes.func,
  type: PropTypes.string,
};

export default NameList;