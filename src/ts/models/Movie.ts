export class Movie {
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