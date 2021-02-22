# Movie Digital Space

## Use Case

Display media contents to the target audience, retrieved from multiple providers. Compute the lowest price and display to the user. Currently there are two providers identified as being popular with target audience, namely Cinemaworld and Filmworld.

#### Technology Approach

There were several options considered while choosing the technology. Such as for backend Springboot2, NodeJs, python, AWS lambda functions etc. Among these NodeJs stood out due to lightweight and because it only needs to retrieve information from multiple provides and serve to the client. AWS lambda could have been an option but the cost might increase relative to increase in number of hits to the website.

For frontend there were three choices React or Angular or Pure HTML/CSS/Bootstrap. React has been chosen due to very less UI components on the screen and lightweight. If there are more components the Angular could have been a choice. Pure CSS/HTML might have taken longer time if I need to add different styles and maintenance might be increased in future when we add new features.

In conclusion, backend is NodeJs(TypeScript) with REST API endpoints and frontend is React(JSX) with Material-UI library. The application is responsive to multiple devices.

## How to?

> Clone the repository

```shell
git clone https://github.com/adityapant1286/movie-digital-space.git
```



> Application Structure

```
movie-digital-space
.
├── LICENSE
├── README.md
├── backend				     # backend node server
│   ├── Dockerfile			 # Docker image file (Optionally deploy on docker)
│   ├── providerConfig.json	 # movie listing provider configurations
│   ├── package-lock.json
│   ├── package.json		 # node js dependencies
│   ├── server.ts			 # main backend server file
│   ├── src
│   │   ├── app.ts			 # loads middleware and routes of the application
│   │   ├── cacheStore
│   │   │   └── CacheService.ts	 # stores data into cache for a quicker response time
│   │   ├── controllers
│   │   │   └── MovieListingController.ts  # REST endpoints
│   │   ├── models
│   │   │   ├── MovieListingProvider.ts			# Provider data model
│   │   │   └── MovieListingProviderBuilder.ts	# Provider data model builder
│   │   └── services
│   │       ├── MovieListingService.ts	# Invoked by controller
│   │       ├── ProviderService.ts		# Retrieves providers data (from json - future DB)
│   │       └── TransformService.ts		# Transforms response to flat Json structure 
│   └── tsconfig.json
└── frontend				# React frontend
    ├── Dockerfile
    ├── package-lock.json
    ├── package.json		# React and node js dependencies
    └── src
        ├── App.css			# Application global styles
        ├── App.jsx			# React app main file
        ├── App.test.js
        ├── cachestore
        │   └── cache.service.jsx	# stores data into cache for a quicker response time
        ├── common
        │   ├── constants.jsx		# stores data into cache for a quicker response time
        │   ├── customTooltip.component.jsx
        │   └── toastify.service.jsx	# display a toast message on the screen
        ├── components
        │   ├── header
        │   │   ├── appbar
        │   │   │   └── media.appbar.jsx	  # displays a brand bar at the top
        │   │   └── mediaHeader.component.jsx	# warps all header components
        │   └── main
        │       └── media
        │           ├── media.component.jsx		# warps all media components
        │           ├── mediaCardTab.component.jsx	 # media additional infor card
        │           └── mediaFlipCard.component.jsx	 # media info card
        ├── helpers
        │   └── mediaComponent.helper.jsx		# communicates with backend app via REST
        ├── index.css
        ├── index.js		# React main file
        ├── logo.svg
        ├── reportWebVitals.js
        ├── setupTests.js
        └── theme
            ├── flipCardStyles.css	
            ├── theme.jsx				# application theme (dark/light)
            └── toastifyStyle.css		# tostify lib styles
```



### Run Application

#### Prerequsites

> nodejs 14 or latest should be installed on the machine. Please use below link to download as per your operating system
>
> https://nodejs.org/en/download/

Open terminal or command-line and navigate to `movie-digital-space` directory



#### Run backend server

Install dependencies by navigating to the `backend` directory. Run `npm install` command to install dependencies, then run `npm start` to start the backend server.

Backend server accessible on `8822` port number. Edit `server.ts` file in case you want to change the port.

```shell
> cd backend
> npm install
> npm start
```



#### Run frontend server

Open another terminal or command-line and navigate to `movie-digital-space` directory.

Install dependencies by navigating to the `frontend` directory. Run `npm install` command to install dependencies, then run `npm start` to start the frontend server.

Frontend server accessible on `2288` port number. Edit `package.json` file in case you want to change the port. The port number is supplied from the `start` script.

> **Important:** If you changed the port number of the backend server. Please update the same port number in `package.json` for a **proxy** field and in  `env` file.

```shell
> cd frontend
> npm install
> npm start
```



### Application Tour

##### Home Screen

Displays the movies retrieved from multiple providers. You can add or remove multiple providers into the `providerConfig.json` file present in backend directory. The application is capable to retrieve data from multiple providers.

![Home Screen](https://github.com/adityapant1286/movie-digital-space/blob/main/readme-img/image-20210222175939398.png)



##### Media Details

Clicking on the information "i" button displays the movie information tabs. User can view the price or info or cast as desire. On clicking of the "i" button the frontend will compute the lowest price amongst all the providers. The lowest price will display on a toast notification as well as a badge.

<img src="https://github.com/adityapant1286/movie-digital-space/blob/main/readme-img/image-20210222190705895.png" alt="Media Details" style="zoom:50%;" />



##### Error handling:

On error or provider service disruption a common message will be displayed. Actual error message can be logged to kibana or other logging frameworks.

![Error Handling](https://github.com/adityapant1286/movie-digital-space/blob/main/readme-img/image-20210222191758206.png)



##### Responsive

The application is designed to work on different screens including mobile, tablets, desktop, and large monitors.

<img src="https://github.com/adityapant1286/movie-digital-space/blob/main/readme-img/image-20210222191224985.png" alt="Responsive Mobile" style="zoom:50%;" />

<img src="https://github.com/adityapant1286/movie-digital-space/blob/main/readme-img/image-20210222191135258.png" alt="Responsive Tablet" style="zoom:50%;" />



##### Miscellaneous

Dark mode, this application supports dark mode where user can toggle as per preference.



## Technical Specs

### Backend

#### API Endpoints

| HTTP Method | API Endpoint      | Request                                                      | Response                                                     | Controller                |
| ----------- | ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------- |
| GET         | /v1/movies        | N/A                                                          | {<br/> "title": string,<br/> "type": string,<br/> "poster": Image URL string,<br/> "providers": [<br/>  {<br/>   "id": string,<br/>   "provider": string,<br/>   "resourceEndpoint": individual resource URL string<br/>  }<br/> ]<br/>} | MovieListingController.ts |
| POST        | /v1/movie/details | {<br/> "title": string,<br/> "providers": [<br/>  {<br/>   "id": string,<br/>   "provider": string,<br/>   "resourceEndpoint": individual resource URL string<br/>  }<br/> ]<br/>} | {<br/> "details": {<br/>  "Actors": string,<br/>  "Country": string,<br/>  "Director": string,<br/>  "Genre": string,<br/>  "ID": string,<br/>  "Language": string,<br/>  "Plot": string,<br/>  "Poster": string,<br/>  "Price": decimal,<br/>  "Production": string,<br/>  "Rated": string,<br/>  "Released": string,<br/>  "Runtime": string,<br/>  "Title": string,<br/>  "Type": string,<br/>  "Writer": string,<br/>  "Year": string,<br/>  "provider": string<br/> },<br/> "pricing": [<br/>  {<br/>   "provider": string,<br/>   "price": decimal<br/>  }<br/> ]<br/>} | MovieListingController.ts |
|             |                   |                                                              |                                                              |                           |

### Providers

System admin can add multiple providers in the `providerConfig.json` file. Please refer the file for adding more entries. 

> **Tip:** This can be enhanced by adding an admin page to the application and add or remove providers directly from the application. These details will be stored into database for provider data manipulations.



#### Parallel Execution

The APIs are tuned to run parallel, however due to the nature of NodeJs it is based on number of cores in the processor.



#### Caching

Application is built around the cache store where the expiration time can be configured in `providerConfig.json` file. The `CachingService` automatically stores information in the cache if not exists already. CachingService returns a `Promise<T>` . Different expirations are set for retrieving all media and retrieving individual media details, for optimised use of memory.

> **TIP**: Monitor the size of data. To avoid out of memory errors, depending on the number of providers and number of media size please adjust the allocated memory of the backend application. Default 512MB



#### JSON Transform

This application uses JSONata https://jsonata.org/ to transform the JSON to desired format. Separating transformation to external library helps to update with minimal changes in the application. `TransformService.ts`



### Frontend

The application frontend is designed based on Material-UI react library https://material-ui.com/. Components are decoupled for easy modifications and wrapped to main component.

#### Theme

Application theme can be changed by updating just a few lines in `theme.jsx` file. Support for dark mode.

> **TIP:** The dark mode can be set as per the user system configurations. Or storing to DB per user preference.



### Miscellaneous

A `dockerfile` has been provided which can be used to deploy application to docker container. 



## Area of improvements

- Unit testing need to be added for identifying issues in the code during build
- Database support can be added for future enhancements and store configurations to DB
- Authentication (OAuth/JWT) can be added to backend before deploying to cloud
- Images need to cache on client side for further optimisations
- API services can be adapted to event based (Reactive) model, which will greatly improve auto refresh components if the media contents changes frequently
