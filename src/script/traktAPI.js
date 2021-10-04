const fetch = require("node-fetch");
require("dotenv").config();

const fetchHeader = {
  "Content-Type": "application/json",
  "trakt-api-version": "2",
  "trakt-api-key": process.env.TKT_CID,
};

const fetchInit = {
  method: "GET",
  headers: fetchHeader,
};

const textQuerySearch = async (type, query) => {
  try {
    const searchResult = await fetch(
      `https://api.trakt.tv/search/${type}?query=${query}`,
      fetchInit
    );
    const parsedResult = await searchResult.json();
    return parsedResult;
  } catch (error) {
    console.error(error);
  }
};

// textQuerySearch("movie", "tron");

const tronResult = [
  {
    type: "movie",
    score: 1000,
    movie: {
      title: "Tron",
      year: 1982,
      ids: { trakt: 66, slug: "tron-1982", imdb: "tt0084827", tmdb: 97 },
    },
  },
  {
    type: "movie",
    score: 723.0286,
    movie: {
      title: "TRON: Legacy",
      year: 2010,
      ids: {
        trakt: 12601,
        slug: "tron-legacy-2010",
        imdb: "tt1104001",
        tmdb: 20526,
      },
    },
  },
  {
    type: "movie",
    score: 311.7956,
    movie: {
      title: "TRON: Destiny",
      year: 2011,
      ids: {
        trakt: 419283,
        slug: "tron-destiny-2011",
        imdb: "tt4061290",
        tmdb: 567883,
      },
    },
  },
  {
    type: "movie",
    score: 284.00876,
    movie: {
      title: "TRON: The Next Day",
      year: 2011,
      ids: {
        trakt: 53924,
        slug: "tron-the-next-day-2011",
        imdb: "tt1865543",
        tmdb: 73362,
      },
    },
  },
  {
    type: "movie",
    score: 237.11687,
    movie: {
      title: "The Making of TRON",
      year: 2002,
      ids: {
        trakt: 53365,
        slug: "the-making-of-tron-2002",
        imdb: "tt0340232",
        tmdb: 72645,
      },
    },
  },
];

// module.exports = {
//   textQuerySearch,
// };
