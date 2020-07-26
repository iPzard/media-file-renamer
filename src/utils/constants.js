export const missingFileText = 'No File';
export const missingNameText = 'Too Many Files';

export const notEnoughFilesWarning = `New names matching '${missingFileText}' it will not be used.`;

export const tooManyFilesWarning = `Files matching with '${missingNameText}' it will not be renamed.`

export const seasonEpisodePrefix = (season, episode) => {
  if(episode < 10) episode = `0${episode}`;
  if(season < 10) season = `0${season}`;

  return `S${season}E${episode} - `;
}