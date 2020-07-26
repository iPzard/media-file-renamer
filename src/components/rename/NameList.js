import {
  missingFileText,
  missingNameText
} from 'utils/constants';

import PropTypes from 'prop-types';
import React from 'react';
import styles from 'components/rename/scss/NameList.module.scss';

/**
 * @description - Lists the file and TV show names.
 *
 * @property {Array} list - Array of file or TV show names.
 * @property {Object} renameData - Object containing updated files and names.
 * @property {string|number} selectedFileIndex - Represents the selected file index at any given moment.
 * @property {function} setRenameData - Function to set the renameData object.
 * @property {string} type - Type of list being passed; 'files' or 'names'.
 */

const NameList = props => {

  const {
    list,
    renameData,
    selectedFileIndex,
    setRenameData,
    type
  } = props;

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
                <span>{ hasNoName ? <span className={ styles['message'] }>{ name }</span> : name }</span>
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