window.onload = function () {

  document.getElementById("button").addEventListener("click", doSearch)
  doSearch();
}

function doSearch() {
  let toSearchFor = document.getElementById("search-text").value
  fetch("http://www.omdbapi.com/?s=" + toSearchFor + "&apikey=92ac141d")
    .then((x) => x.json())
    .then((result) => {

      for (let i = 0; i < result.Search.length; i++) {
        let img = document.createElement("img");
        let heading = document.createElement("h3");
        let year = document.createElement("span");

        img.src = result.Search[i].Poster;
        heading.innerHTML = result.Search[i].Title;
        year.innerHTML = result.Search[i].Year;

        let container = document.createElement("div");
        container.addEventListener("click", () => {
          handleMovieClick(result.Search[i].imdbID);
        })
        container.classList.add("movie-container");
        container.appendChild(img);
        container.appendChild(heading);
        container.appendChild(year);

        document.getElementById("result").appendChild(container);
      }
    });
}

function handleMovieClick(imdbid) {
  fetch("http://www.omdbapi.com/?i=" + imdbid + "&apikey=416ed51a")
    .then((response) => response.json())
    .then((result) => window.open("http://www.imdb.com/title/" + result.imdbID));
}