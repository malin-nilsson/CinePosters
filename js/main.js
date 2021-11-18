window.onload = function () {
    document.getElementById("button").addEventListener("click", doSearch);
    doSearch();
};
var Movie = /** @class */ (function () {
    function Movie(imageUrl, title, year, imdb) {
        this.image = imageUrl;
        this.title = title;
        this.released = year;
        this.imdbID = imdb;
    }
    return Movie;
}());
function doSearch() {
    var inputElement = document.getElementById("search-text");
    var inputValue = inputElement.value;
    fetch("http://www.omdbapi.com/?s=" + inputValue + "&apikey=92ac141d")
        .then(function (response) { return response.json(); })
        .then(function (result) {
        var movies = result.Search.map(function (movie) {
            var img = document.createElement("img");
            var heading = document.createElement("h3");
            var year = document.createElement("span");
            img.src = movie.Poster;
            heading.innerHTML = movie.Title;
            year.toString();
            year.innerHTML = movie.Year.toString();
            var container = document.createElement("div");
            container.addEventListener("click", function () {
                handleMovieClick(movie.imdbID);
            });
            container.classList.add("movie-container");
            container.appendChild(img);
            container.appendChild(heading);
            container.appendChild(year);
            document.getElementById("result").appendChild(container);
            return new Movie(movie.Poster, movie.Title, movie.Year, movie.imdbID);
        });
        console.log(movies);
    });
}
function handleMovieClick(imdbid) {
    fetch("http://www.omdbapi.com/?i=" + imdbid + "&apikey=416ed51a")
        .then(function (response) { return response.json(); })
        .then(function (result) { return window.open("http://www.imdb.com/title/" + result.imdbID); });
}
