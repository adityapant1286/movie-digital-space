import App from "./src/app";
import MovieListingController from "./src/controllers/MovieListingController";

const PORT = 8822;

const app = new App([
    new MovieListingController()
], PORT);

app.listen();
