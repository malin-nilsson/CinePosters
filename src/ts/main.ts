import { IMovie } from "./models/IMovie";
import { Movie } from "./models/Movie";
import { IOmdbResponse } from "./models/IOmdbResponse";

window.onload = function () {
  document.getElementById("button").addEventListener("click", doSearch)
  document.getElementById("search-text").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      doSearch();
    }
  })
}

function doSearch() {
  let content = document.getElementById("result");
  content.innerHTML = "";
  
  let inputElement: HTMLInputElement = document.getElementById("search-text") as HTMLInputElement;
  let inputValue: string = inputElement.value;

  fetch("http://www.omdbapi.com/?s=" + inputValue + "&apikey=92ac141d")
    .then((response: Response) => response.json())
    .then((result: IOmdbResponse) => {

      let movies: Movie[] = result.Search.map((movie: IMovie) => {
        let img: HTMLImageElement = document.createElement("img");
        let heading: HTMLHeadingElement = document.createElement("h3");
        let year: HTMLSpanElement = document.createElement("span");

        img.src = movie.Poster;
        heading.innerHTML = movie.Title;
        year.toString();
        year.innerHTML = movie.Year.toString();

        let container: HTMLDivElement = document.createElement("div");
        img.addEventListener("click", () => {
          handleMovieClick(movie.imdbID);
        })

      

        container.classList.add("movie-container");
        container.appendChild(img);
        container.appendChild(heading);
        container.appendChild(year);

          fetch("http://www.omdbapi.com/?i=" + movie.imdbID + "&apikey=416ed51a")
            .then((response) => response.json())
            .then((result) => {
              let paragraph: HTMLParagraphElement = document.createElement("p");
              paragraph.innerHTML = result.Plot;
              paragraph.classList.add("plot");
              container.appendChild(paragraph);
            });
        

        document.getElementById("result").appendChild(container);

        return new Movie(movie.Poster, movie.Title, movie.Year, movie.imdbID);
      });
    });
}

function handleMovieClick(imdbid) {
  fetch("http://www.omdbapi.com/?i=" + imdbid + "&apikey=416ed51a")
    .then((response) => response.json())
    .then((result) => window.open("http://www.imdb.com/title/" + result.imdbID));
}