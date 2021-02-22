/* 
    Copyright (C) 2021  
    Author: Aditya Pant
    Email: aditya.java6@gmail.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

import express, { Request, Response } from "express";
import MovieListingService from "../services/MovieListingService";

class MovieListingController {

    public path = '/movies';
    public movieDetails = '/movie/details';
    public router = express.Router();

    private service: MovieListingService;

    constructor() {
        this.service = new MovieListingService();
        
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path, this.getAllMovies);
        this.router.post(this.movieDetails, this.queryMovies);
    }

    queryMovies = (req: Request, res: Response, next: any) => {        
        
        this.service.findDetails(req.body)
        .then(result => {
            res.status(200).send(result);
        }).catch(err => {
            console.log('---controller err---');
            // console.log(err.response.status);
            // console.log(err.response.statusText);
            
            res.status(err.response.status).send(err.response.data.message);

        });
    }

    getAllMovies = (req: Request, res: Response, next: any) => {

        this.service.findAll()
            .then((result) => {

                res.status(200).send(result);

            }).catch(err => {

                console.log('---controller err---');
                // console.log(err.response.status);
                // console.log(err.response.statusText);
                
                res.status(err.response.status).send(err.response.data.message);
            });
        }
}

export default MovieListingController;