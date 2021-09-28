// const trakt = require("./traktAPI");
// const fanArt = require("./fanArtAPI");

// API KEYS
const TKT_CID =
  "df7993d30d3bcdacc3e4bb5a9e359e8b2bd47b4a91e70d176b600a7a17321c2a";
const FANART_KEY = "606bc502a124b7a38459fe07f9c74d22";

// TRAKT API

const fetchHeader = {
  "Content-Type": "application/json",
  "trakt-api-version": "2",
  "trakt-api-key": TKT_CID,
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

// FANART API

const fanArtSearch = async (tmdb_id) => {
  const searchResult = await fetch(
    `http://webservice.fanart.tv/v3/movies/${tmdb_id}?api_key=${FANART_KEY}`
  );
  const parsedResult = await searchResult.json();
  return parsedResult;
};

// const getCover = async (id) => fanArtSearch(id).movieposter[0];

// ADD EVENT LISTENERS
const addListeners = (targetElement, targetEvent, targetFunction) => {
  const elementArray = document.querySelectorAll(targetElement);
  elementArray.forEach((element) => {
    element.addEventListener(targetEvent, targetFunction);
  });
};

// GET USER TEXT INPUT
const getText = () => document.getElementById("searchBox").value;

// ADVANCED SEARCH DROPDOWN MENU
const dropDownMenu = () => document.getElementById("advancedSearch").value;

// BUTTON CALLBACK
const submitButtonAction = async () => {
  const searchType = dropDownMenu();
  const searchText = getText();
  const searchResult = await textQuerySearch(searchType, searchText);
  searchResult.forEach((result) => {
    cardCreator(result);
  });
};

// SUBMIT SEARCH BUTTON
addListeners(".submit-button", "click", submitButtonAction);

// OPEN Movie CARD
const openMovieCard = () => {
  console.log("card open");
};

// CREATE LIST CARD
const cardCreator = (data) => {
  const resultList = document.getElementsByClassName("search-results")[0];
  const newCard = document.createElement("li");
  newCard.classList.add = "result-card";
  newCard.id = data.movie.ids.tmdb;
  addListeners(`[id="${newCard.id}"]`, "click", openMovieCard);
  cardFiller(newCard, data);
  resultList.appendChild(newCard);
};

// FILL CARD WITH API INFO
const cardFiller = (card, data) => {
  const title = document.createElement("p");
  title.innerText = data.movie.title;
  title.classList.add = "cardTitle";
  card.appendChild(title);

  const year = document.createElement("p");
  year.innerText = data.movie.year;
  year.classList.add = "cardYear";
  card.appendChild(year);

  const poster = document.createElement("img");
  poster.src = fanArtSearch(data.movie.ids.tmdb);
  poster.classList.add = "cardPoster";
  card.appendChild(poster);
};

// textQuerySearch > fanartAPI > cardCreator

// submitButtonListener > submitButtonAction > cardCreator > cardFiller > getImage

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
