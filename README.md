#Week2: API Documentation

This API has seven routes:
```
GET /movies
GET /movies/:id
GET /movies/title/:title
GET /movies/title/:title/year/:year
POST /movies
PUT /movies/:id
DELETE /movies/:id
```

#GET /movies
-- Function name: getAll
-- Params: None
-- Use case: Return first 10 movies in the database sorted by Year ascendingly.  Data columns included: _id, title, runtime, year. 
-- Curl statement: curl http://localhost:5000/movies
-- Expected Result: List of movies
-- Negative cases:
**No movies found: when there is no movie in the db then display message "message: no movie found!"

#GET /movies/:id
-- Function Name: getById
-- Params: MovieId
-- Use case: Search for a specific movie by movie id where id must be a string of 12 bytes or string of 24 hex characters
-- Curl statement: curl http://localhost:5000/movies/573a139cf29313caabcf560f
-- Expected Result: list single movie titled "The Kiss" with id: 573a139cf29313caabcf560f
-- Negative cases:
**Movie not found: display html page with message: Cannot GET /movies/123
-- Curl statement: curl http://localhost:5000/movies/123
#GET /movies/title/:title
-- Function Name: getByTitle
-- Params: movieTitle
-- Use case: Search for a specific movie by movie title where title is a non empty string
-- Curl statement: curl http://localhost:5000/movies/title/Top%20Gun
-- Expected Result: list single movie titled "Top Gun" with id: 573a1398f29313caabcea315
-- Negative cases:
**Title param is blank: display html page with message: Cannot GET /movies/title
-- Curl statement: curl http://localhost:5000/title
**Movie not found: display message: "error":"no movie found with title Top Gun2"
-- Curl statement: curl http://localhost:5000/movies/title/Top%20Gun2
#GET /movies/title/:title/year:year
-- Function Name: getByTitleYear
-- Params: movieTitle, movieYear
-- Use case: Search for specific movies by movie title and movie year where title is a non empty string and year is a four digit number
-- Curl statement:  curl http://localhost:5000/movies/title/The%20Kiss/year/1896
-- Expected Result: return 2 entries of movies with title "The Kiss" and year 1896
-- Negative cases:
** Movie not found: return message "message":"no movie found with title T and year 1896"
--Curl statement: curl http://localhost:5000/movies/title/T/year/1896
**Title param is blank: display html page with message: Cannot GET  /movies/title/year/1896
--Curl statement: curl http://localhost:5000/movies/title/year/1896
**Year param is blank: display html page with message: Cannot GET  /movies/title/The%20Kiss/year/
--Curl Statement: curl http://localhost:5000/movies/title/The%20Kiss/year/
#POST /movies/
-- Function Name: create
-- Params: movieTitle, moviePlot
-- Use case: create new movie entry with title and plot using movieTitle and moviePlot
-- Curl statement: curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies
-- Expected Result: a new movie is created and its id is displayed
-- Negative cases:
**Title param is blank: display message "New movie not added. Must have valid Title and Plot!"
-- Curl statement: curl -X POST -H "Content-Type: application/json" -d '{"title":"", "plot":"Aliens..."}' http://localhost:5000/movies
**Plot param is blank: display message "New movie not added. Must have valid Title and Plot!"
-- Curl statement: curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":""}' http://localhost:5000/movies
#PUT /movies/:id
-- Function Name: getByTitleYear
-- Params: movieTitle, movieYear
-- Use case:
-- Curl statement:
-- Expected Result:
-- Negative cases:
**Movie not found
**Plot param is blank
#DELETE /movies/:id
-- Function Name: getByTitleYear
-- Params: movieTitle, movieYear
-- Use case:
-- Curl statement:
-- Expected Result:
-- Negative cases:
**Movie not found