import { action, makeObservable, observable, runInAction } from "mobx";
import http from "../Http/Http";

class InTheaterMovieStore {
  movieList = [];
  isLoading = true;
  errors = "";
  constructor() {
    makeObservable(this, {
      movieList: observable,
      isLoading: observable,
      errors: observable,
      getMovies: action,
    });
  }

  async getMovies() {
    try {
      const { data } = await http.get(
        "https://imdb-api.com/en/API/InTheaters/k_eds5tnq4"
      );
      runInAction(() => {
        this.movieList = data;
        this.errors = data.errorMessage;
        this.isLoading = false;
      });
    } catch (error) {
      console.log("Error Message::: ", error);
    }
  }
}

const inTheaterMovieStore = new InTheaterMovieStore();
export default inTheaterMovieStore;