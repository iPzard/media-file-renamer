export const searchShows = (query, callback) => {
  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then(matches => matches.json())
    .then(matches => callback(matches) || undefined);
};