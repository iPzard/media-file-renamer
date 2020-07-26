/**
 * @namespace Constants
 * @description - Constants used throughout the project.
 */

/**
 * @description - Text to display when no file is found to match TV show episode.
 * @memberof Constants
 */
export const missingFileText = 'No File';

/**
 * @description - Text to display when too many files are provided when compared to matching TV show.
 * @memberof Constants
 */
export const missingNameText = 'Too Many Files';

/**
 * @description - Warning that displays when there are not enough files provided.
 * @memberof Constants
 */
export const notEnoughFilesWarning = `New names matching '${missingFileText}' it will not be used.`;

/**
 * @description - Warning that displays when too many files provided.
 * @memberof Constants
 */
export const tooManyFilesWarning = `Files matching with '${missingNameText}' it will not be renamed.`

/**
 * @description - Helper function to add a leading 0 to season/episodes less than 10.
 * @memberof Constants
 */
export const seasonEpisodePrefix = (season, episode) => {
  if(episode < 10) episode = `0${episode}`;
  if(season < 10) season = `0${season}`;

  return `S${season}E${episode} - `;
}