## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


### Development notes
1. Created 3 components
    * Home - where you can selec name and quiz type
    * questions - where you answer all questions
    * Results - to show quiz results

2. Switching between components is done by VUE router. It is also used for passing data. Chose to use VUE router.
3. In questions component there is custom logic for answers preperation, cause api doesn't accept array of answers per question, instead it accepts string of 
concatenated ids.
4. For styling mostly used bootstrap.css, cause it is fast way to build layout if no specific styles are required.
5. If results, and questions pages are refreshed, i am redirecting to quiz home, cause by rules understood that no localstorage usage was needed.
6. For Ajax requests used axios, cause it is most used lib for vue.js apps. Optionally i could use JQuery etc.
7. Routes are defined in main.js file