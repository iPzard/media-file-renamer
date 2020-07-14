const apiUrl = 'https://api.tvmaze.com';

export const searchShows = (query, callback) => {
  fetch(`${apiUrl}/search/shows?q=${query}`)
    .then(matches => matches.json())
    .then(matches => callback(matches) || undefined);
};