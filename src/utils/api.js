import { get } from 'utils/requests';

/**
 * @namespace API
 * @description - TVMaze API related functions
 */
const apiUrl = 'https://api.tvmaze.com/';


 /**
  * @description - Function to search for TV shows.
  * @param {string} query - User entered search query.
  * @param {Function} callback - Callback which provides the matched results as an argument
  * @memberof API
  */
export const searchShows = (query, callback) => {
  get(`${apiUrl}/search/shows?q=${query}`, matches => callback(matches));
};

 /**
  * @description - Function to search for TV shows.
  * @param {string} id - TV Show episode ID.
  * @param {Function} callback - Callback which provides the matched results as an argument
  * @memberof API
  */
export const getEpisodeList = (id, callback) => {
  get(`http://api.tvmaze.com/shows/${id}/episodes`, matches => callback(matches));
};