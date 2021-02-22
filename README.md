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
├── backend									# backend node server
│   ├── Dockerfile					# Docker image file (Optionally deploy on docker)
│   ├── config.json					# backend app configuration
│   ├── package-lock.json
│   ├── package.json
│   ├── server.ts
│   ├── src
│   │   ├── app.ts
│   │   ├── cacheStore
│   │   │   └── CacheService.ts
│   │   ├── controllers
│   │   │   └── MovieListingController.ts
│   │   ├── models
│   │   │   ├── MovieListingProvider.ts
│   │   │   └── MovieListingProviderBuilder.ts
│   │   └── services
│   │       ├── MovieListingService.ts
│   │       ├── ProviderService.ts
│   │       └── TransformService.ts
│   └── tsconfig.json
└── frontend
    ├── Dockerfile
    ├── __tsconfig.json.bak
    ├── package-lock.json
    ├── package.json
    └── src
        ├── App.css
        ├── App.jsx
        ├── App.test.js
        ├── cachestore
        │   └── cache.service.jsx
        ├── common
        │   ├── constants.jsx
        │   ├── customTooltip.component.jsx
        │   └── toastify.service.jsx
        ├── components
        │   ├── header
        │   │   ├── appbar
        │   │   │   └── media.appbar.jsx
        │   │   └── mediaHeader.component.jsx
        │   └── main
        │       └── media
        │           ├── media.component.jsx
        │           ├── mediaCardTab.component.jsx
        │           └── mediaFlipCard.component.jsx
        ├── helpers
        │   └── mediaComponent.helper.jsx
        ├── index.css
        ├── index.js
        ├── logo.svg
        ├── reportWebVitals.js
        ├── setupTests.js
        └── theme
            ├── flipCardStyles.css
            ├── theme.jsx
            └── toastifyStyle.css
```

