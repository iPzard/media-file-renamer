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
 * @property {Function} setRenameData - Function to set the renameData object.
 * @property {string} type - Type of list being passed; 'files' or 'names'.
 * @memberof Rename
 */

const NameList = (props) => {

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
            const hasNoName = name.includes(missingFileText) || name.includes(missingNameText);
            const matchesMissingName = !hasNoName && type === 'files' ?
              renameData.names[index]?.includes(missingNameText) :
              renameData.files[index]?.includes(missingFileText);

            const selected = selectedFileIndex === index && type === 'files';
            const listProps = { key: hasNoName ? `${type}-${index}` : `${type}-${name}` };

            if(hasNoName) {
              listProps.className = styles['missing-name'];
            }

            else if(matchesMissingName) {
              listProps.className = styles['matches-missing-name']
            }

            if(selected) {
              listProps.className += ` ${styles['selected-file']}`; // Todo: see if this is adding "undefined" to DOM element
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