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
            var button = document.createElement("button");
            img.src = movie.Poster;
            heading.innerHTML = movie.Title;
            year.toString();
            year.innerHTML = movie.Year.toString();
            button.innerHTML = "Plot";
            var container = document.createElement("div");
            img.addEventListener("click", function () {
                handleMovieClick(movie.imdbID);
            });
            container.classList.add("movie-container");
            container.appendChild(img);
            container.appendChild(heading);
            container.appendChild(year);
            container.appendChild(button);
            button.addEventListener("click", function () {
                fetch("http://www.omdbapi.com/?i=" + movie.imdbID + "&apikey=416ed51a")
                    .then(function (response) { return response.json(); })
                    .then(function (result) {
                    var paragraph = document.createElement("p");
                    paragraph.innerHTML = result.Plot;
                    paragraph.classList.add("plot");
                    container.appendChild(paragraph);
                    button.disabled = true;
                });
            });
            document.getElementById("result").appendChild(container);
            return new Movie(movie.Poster, movie.Title, movie.Year, movie.imdbID);
        });
    });
}
function handleMovieClick(imdbid) {
    fetch("http://www.omdbapi.com/?i=" + imdbid + "&apikey=416ed51a")
        .then(function (response) { return response.json(); })
        .then(function (result) { return window.open("http://www.imdb.com/title/" + result.imdbID); });
}
