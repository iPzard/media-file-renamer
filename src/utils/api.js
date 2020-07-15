import { get } from 'utils/requests';

const apiUrl = 'https://api.tvmaze.com/';

export const searchShows = (query, callback) => {
  get(`${apiUrl}/search/shows?q=${query}`, matches => callback(matches));
};

export const getEpisodeList = (id, callback) => {
  get(`http://api.tvmaze.com/shows/${id}/episodes`, matches => callback(matches));
};