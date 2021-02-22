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
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import createError from "http-errors";


class App {
    public app: express.Application;
    public port: Number;

    constructor(controllers: Array<any>, port: Number) {
        this.app = express();
        this.port = port;

        this.loadMiddlewares();
        this.loadControllers(controllers);
    }

    private loadMiddlewares() {
        // this.app.use(morgan("combined")); // logger
        this.app.use(cors());
        this.app.use(morgan("dev")); // logger
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
    }

    private loadControllers(controllers: Array<any>) {
        const resMsg = '<h3 style="font-family: Arial; padding: 1rem;">Server is running</h3>';

        this.app.get('/', (req, res) => res.send(resMsg));

        controllers.forEach(c => {
            this.app.use('/v1/', c.router);
        });


        this.app.use((_req: Request, _res: Response, next: (arg0: createError.HttpError) => void) => {
            console.log('404');
            next(createError(404));
        });

        this.app.use((_err: any, _req: Request, _res: Response, next: (arg0: createError.HttpError) => void) => {
            console.log(_err.status + ' | 500');
            _res.status(_err.status || 500 || 502).json({
                message: _err.message,
                error: _err
            });
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('Backend server started on ' + this.port);
        });
    }
}

export default App;
