// API KEYS
const TKT_CID =
  "df7993d30d3bcdacc3e4bb5a9e359e8b2bd47b4a91e70d176b600a7a17321c2a";
const TMDB_KEY = "2d02c9dafd954f59df347ef511f7ccc9";

// ADD EVENT LISTENERS
const addListeners = (targetElement, targetEvent, targetFunction) => {
  const elementArray = document.querySelectorAll(targetElement);
  elementArray.forEach((element) => {
    element.addEventListener(targetEvent, targetFunction);
  });
};

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

// TMDB API

const TMDBSearch = async (tmdb_id) => {
  const searchResult = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdb_id}/images?api_key=${TMDB_KEY}&language=en`
  );
  const parsedResult = await searchResult.json();
  return parsedResult;
};

// GET POSTER IMAGE
const getPosterImage = async (tmdb_id) => {
  try {
    const searchResult = await TMDBSearch(tmdb_id);
    const posterList = await searchResult.posters;
    const sortedList = await posterList.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    return `http://image.tmdb.org/t/p/original${sortedList[0].file_path}`;
  } catch (error) {
    return "https://iili.io/RbOewl.md.jpg";
  }
};

//GET MODAL BANNER
const getModalBanner = async (tmdb_id) => {
  try {
    const searchResult = await TMDBSearch(tmdb_id);
    const modalImg = await searchResult.backdrops;
    const sortedList = await modalImg.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    const fullURL = `http://image.tmdb.org/t/p/original${sortedList[0].file_path}`;
    return fullURL;
  } catch (error) {
    return "https://iili.io/RbOewl.md.jpg";
  }
};

// GET MOVIE DATA TO FILL MODAL
const getModalData = async (movieSlug) => {
  try {
    const searchResult = await fetch(
      `https://api.trakt.tv/movies/${movieSlug}?extended=full`,
      fetchInit
    );
    const result = await searchResult.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// CLOSE MODAL ACTION
const closeModalAction = (event) => {
  const modal = document.getElementsByClassName("modal")[0];
  modal.classList.remove("is-active");
};

// CLOSE MODAL BUTTON
const closeModalButton = () => {
  addListeners(".delete", "click", closeModalAction);
};

// GET USER TEXT INPUT
const getText = () => document.getElementById("searchBox").value;

// ADVANCED SEARCH DROPDOWN MENU
const dropDownMenu = () => document.getElementById("advancedSearch").value;

// BUTTON CALLBACK
const submitButtonAction = async () => {
  if (document.getElementsByClassName("search-results")[0].innerHTML) {
    document.getElementsByClassName("search-results")[0].innerHTML = "";
  }
  const mainContainer = document.querySelector(".mainContainer");
  mainContainer.classList.add("mainContainerSearched");
  const searchType = dropDownMenu();
  const searchText = getText();
  const searchResult = await textQuerySearch(searchType, searchText);
  searchResult.forEach((result) => {
    cardCreator(result);
  });
};

// SUBMIT SEARCH BUTTON
addListeners(".submit-button", "click", submitButtonAction);

// FILL MODAL WITH API INFO
const modalFiller = async (event) => {
  const modal = document.getElementsByClassName("modal")[0];
  const modalTitle = document.getElementsByClassName("modal-card-title")[0];
  const modalCardHead = document.getElementsByClassName("modal-card-head")[0];
  const modalCardBody = document.getElementsByClassName("modal-card-body")[0];
  const modalCardFoot = document.getElementsByClassName("modal-card-foot")[0];
  const movieId = event.target.closest("li").id;
  const movieSlug = event.target.closest("li").title;

  modalCardHead.style.backgroundImage = `url(${await getModalBanner(movieId)})`;

  const movieData = await getModalData(movieSlug);

  modalTitle.innerText = `${movieData.title} (${movieData.year}) - ${movieData.certification}`;

  modalCardBody.innerText = `Released: ${movieData.released}, Runtime: ${movieData.runtime}min, Country: ${movieData.country}, Language: ${movieData.language},
  Genres: ${movieData.genres}`;

  modalCardFoot.innerText = `${movieData.tagline} 
  
  Overview: ${movieData.overview}`;

  openMovieCard();
};

// OPEN MODAL
const openMovieCard = () => {
  const modal = document.getElementsByClassName("modal")[0];
  modal.classList.add("is-active");
  closeModalButton();
};

// CREATE LIST CARD
const cardCreator = (data) => {
  const resultList = document.getElementsByClassName("search-results")[0];
  const newCard = document.createElement("li");
  newCard.classList.add = "result-card";
  newCard.id = data.movie.ids.tmdb;
  newCard.title = data.movie.ids.slug;
  cardFiller(newCard, data);
  resultList.appendChild(newCard);
  addListeners(`[id="${newCard.id}"]`, "click", modalFiller);
};

// FILL CARD WITH API INFO
const cardFiller = async (card, data) => {
  const titleYear = document.createElement("p");
  titleYear.innerText = `${data.movie.title} (${data.movie.year})`;
  titleYear.className = "cardTitleYear";
  card.appendChild(titleYear);

  const poster = document.createElement("img");
  poster.src = "https://iili.io/RbOewl.md.jpg";
  const posterUrl = await getPosterImage(data.movie.ids.tmdb);
  poster.src = posterUrl;
  poster.className = "cardPoster image";
  card.appendChild(poster);
};

// submitButtonListener > submitButtonAction > cardCreator > cardFiller > getImage

// Cabeçalho: Tile (Year) ------ Certification
// Dados: Released, Runtime, Country, Language, Genres
// Sinopse: Tagline, Overview
// ?extended=full

// const imageBackdrop = {
//   backdrops: [
//     {
//       aspect_ratio: 1.778,
//       height: 1080,
//       iso_639_1: "en",
//       file_path: "/38B4MIYNyWpehNBQ9pc22OQjsZ7.jpg",
//       vote_average: 5.312,
//       vote_count: 1,
//       width: 1920,
//     },
//   ],
// };

// const imageObject = [
//   {
//     aspect_ratio: 0.66posterList
//     file_path: "/o8ZrKMFAb4KLBH1pwdLK8XZ4oE0.jpg",
//     vote_average: 5.252,
//     vote_count: 4,
//     width: 1000,
//   },
//   {
//     aspect_ratio: 0.667,
//     height: 900,
//     iso_639_1: "en",
//     file_path: "/nEOR6wG7C4ITVlJnh6MBgygTxcQ.jpg",
//     vote_average: 5.106,
//     vote_count: 2,
//     width: 600,
//   },
// ];

// const tronResult = {
//   "title": "TRON: Legacy",
//   "year": 2010,
//   "ids": {
//     "trakt": 12601,
//     "slug": "tron-legacy-2010",
//     "imdb": "tt1104001",
//     "tmdb": 20526
//   },
//   "tagline": "The Game Has Changed.",
//   "overview": "Sam Flynn, the tech-savvy and daring son of Kevin Flynn, investigates his father's disappearance and is pulled into The Grid. With the help of a mysterious program named Quorra, Sam quests to stop evil dictator Clu from crossing into the real world.",
//   "released": "2010-12-17",
//   "runtime": 125,
//   "country": "us",
//   "trailer": "http://youtube.com/watch?v=L9szn1QQfas",
//   "homepage": "http://disney.go.com/tron/",
//   "status": "released",
//   "rating": 7.2512,
//   "votes": 15147,
//   "comment_count": 52,
//   "updated_at": "2021-09-21T17:07:00.000Z",
//   "language": "en",
//   "available_translations": [
//     "bg",
//     "cs",
//     "da",
//     "de",
//     "el",
//     "en",
//     "es",
//     "fa",
//     "fi",
//     "fr",
//     "he",
//     "hu",
//     "id",
//     "it",
//     "ja",
//     "ka",
//     "ko",
//     "lt",
//     "nl",
//     "no",
//     "pl",
//     "pt",
//     "ro",
//     "ru",
//     "sk",
//     "sl",
//     "sv",
//     "th",
//     "tr",
//     "uk",
//     "vi",
//     "zh"
//   ],
//   "genres": [
//     "action",
//     "adventure",
//     "science-fiction"
//   ],
//   "certification": "PG"
// };
