(function () {
  const API_KEY = "88bb319131881a47bed8630b8e3c0e5e";
  const API_URL = "https://api.themoviedb.org/3/";
  const API_IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  const POPULAR_URL = `discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
  const SEARCH_URL = `search/movie?&api_key=${API_KEY}&query=`;

  window.DataService = {
    getMovies: getMovies,
    getPicturePath: getPicturePath,
    getSerchingMovies: getSerchingMovies,
  };

  async function getMovies() {
    // fetch
    const result = await fetch(API_URL + POPULAR_URL);
    const data = await result.json();

    return data.results;
  }

  async function getSerchingMovies(movie) {
    const result = await fetch(API_URL + SEARCH_URL + movie);
    const data = await result.json();

    return data.results;
  }

  function getPicturePath(poster_path) {
    return API_IMG_PATH + poster_path;
  }
})();

(async function () {
  const $movieList = document.getElementById("main");
  const $movieTemplate = document.getElementById("movieTemplate");

  const searchInput = document.querySelector(".search-input");
  const form = document.querySelector("#searchForm");

  const movies = await DataService.getMovies();
  //   const searchingMovies = await DataService.getSerchingMovies();

  let searcMovie = "";

  const moviesHTML = [];

   movies.forEach(drawMovieCard);
  

  async function searchFilm(e) {
    e.preventDefault();
    searcMovie = searchInput.value;
    let searchingMovies = await DataService.getSerchingMovies(searcMovie);
    searchingMovies.forEach(item=>drawMovieCard(item));
  }
  
  

  $movieList.innerHTML = moviesHTML.join("");
  

  function drawMovieCard(movie) {
    
    movie.imageSrc = DataService.getPicturePath(movie.poster_path);

    let template = $movieTemplate.innerHTML;

    const matches = template.match(/\{\{.+?\}\}/g);
    // {{title}}, {{sdfsfs}}

    matches.forEach((match) => {
      const name = match.replace("{{", "").replace("}}", "");
      template = template.replace(match, movie[name]);
    });

    console.log(template)

    moviesHTML.push(template);
  }

  form.addEventListener("submit", searchFilm);
})();
