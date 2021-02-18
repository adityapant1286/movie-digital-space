import express, { Request, Response } from "express";
import MovieListingService from "../services/MovieListingService";

class MovieListingController {

    public path = '/movies';
    public router = express.Router();

    private service: MovieListingService;

    constructor() {
        this.service = new MovieListingService();
        
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path, this.getAllMovies);
    }

    getAllMovies = (req: Request, res: Response, next: any) => {
        this.service.findAll()
        .then((result) => {
            res.status(200).send(result);
        }).catch(err => {
            console.log('---controller err---');
            console.log(err.status);
            console.log(err.statusText);
            console.log(err.data);
            console.log(err);
            
            // res.status(err.status).send(err.message);
        });
    }
}

export default MovieListingController;