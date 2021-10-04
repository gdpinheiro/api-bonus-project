const fetch = require("node-fetch");
require("dotenv").config();

const api_key = process.env.FANART_KEY;

const getImage = async (tmdb_id) => {
  const searchResult = await fetch(
    `http://webservice.fanart.tv/v3/movies/${tmdb_id}?api_key=${api_key}`
  );
  const parsedResult = await searchResult.json();
  return parsedResult;
};

// getImage("10195");

module.exports = {
  getImage,
};
