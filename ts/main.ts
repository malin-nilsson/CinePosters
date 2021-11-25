window.onload = function () {
  document.getElementById("button").addEventListener("click", doSearch)
  doSearch();
}

interface IMovie {
  Poster: string;
  Title: string;
  Year: number;
  imdbID: string;
}

interface IOmdbResponse {
  Search: IMovie[];
}

class Movie {
  image: string;
  title: string;
  released: number;
  imdbID: string;

  constructor(imageUrl: string, title: string, year: number, imdb: string) {
    this.image = imageUrl;
    this.title = title;
    this.released = year;
    this.imdbID = imdb;
  }
}

function doSearch() {
  let inputElement: HTMLInputElement = document.getElementById("search-text") as HTMLInputElement;
  let inputValue: string = inputElement.value;

  fetch("http://www.omdbapi.com/?s=" + inputValue + "&apikey=92ac141d")
    .then((response: Response) => response.json())
    .then((result: IOmdbResponse) => {

      let movies: Movie[] = result.Search.map((movie: IMovie) => {
        let img: HTMLImageElement = document.createElement("img");
        let heading: HTMLHeadingElement = document.createElement("h3");
        let year: HTMLSpanElement = document.createElement("span");
        let button: HTMLButtonElement = document.createElement("button");

        img.src = movie.Poster;
        heading.innerHTML = movie.Title;
        year.toString();
        year.innerHTML = movie.Year.toString();
        button.innerHTML = "Plot";

        let container: HTMLDivElement = document.createElement("div");
        img.addEventListener("click", () => {
          handleMovieClick(movie.imdbID);
        })

        container.classList.add("movie-container");
        container.appendChild(img);
        container.appendChild(heading);
        container.appendChild(year);
        container.appendChild(button);

        button.addEventListener("click", () => {
          fetch("http://www.omdbapi.com/?i=" + movie.imdbID + "&apikey=416ed51a")
          .then((response) => response.json())
          .then((result) => {
            let paragraph: HTMLParagraphElement = document.createElement("p");
            paragraph.innerHTML = result.Plot;
            paragraph.classList.add("plot");
            container.appendChild(paragraph);
            button.disabled = true;
          });
        })

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