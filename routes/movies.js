const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');
// add a get by title and year route handler
// curl http://localhost:5000/movies/title/The%20Kiss/year/1896
// check for no data found
// curl http://localhost:5000/movies/title/T/year/1920
// curl http://localhost:5000/movies/title/year/1896
// curl http://localhost:5000/movies/title/The%20Kiss/year/
router.get("/title/:title/year/:year", async (req, res, next) => {
  let movieList = await movieData.getByTitleYear(req.params.title, req.params.year);

  // error checking

  if(movieList.count>0)
  {
    res.status(200).send(movieList)
  } 
  else {
    res.status(404).send({ message: `No movie found with title ${req.params.title} and year ${req.params.year}` });
  }  

});
// HOMEWORK TODO: add a get by title route handler
// curl http://localhost:5000/movies/title/The%20Kiss
// check for no data found
// curl http://localhost:5000/movies/title/The%20Kisses
router.get("/title/:title", async (req, res, next) => {
  
  let movieList = await movieData.getByTitle(req.params.title);
  // error checking
  if(movieList.count>0)
  {
      res.status(200).send(movieList);
  } 
  else 
  {
      res.status(404).send({ error: `no movie found with title ${req.params.title}` });
  }  

});
// curl http://localhost:5000/movies
router.get("/", async (req, res, next) => {
  let movieList = await movieData.getAll();
   // error checking
  if(movieList.length >0){
    res.status(200).send(movieList);
  } else 
  {
    res.status(404).send({ message: `No movie found!` });
  }  
});

// curl http://localhost:5000/movies/573a1390f29313caabcd4135
router.get("/:id([0-9a-fA-F]{24})", async (req, res, next) => {
  const theMovie = await movieData.getById(req.params.id);
  try
  {
    if(theMovie)
    {
      res.status(200).send(theMovie);
    } else 
    {
      res.status(404).send({ error: `No movie found!` });
    }  
  }
  catch (e)
  {
    res.status(404).send({ error: `No movie found!` });
  } 
});

// curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies
router.post("/", async (req, res, next) => {

  if (req.body.title.length >0 && req.body.plot.length >0)
  {
    let result = await movieData.create(req.body);
    // TODO: if !result.newObjId send something different
    res.status(200).send(result);
  }
  else
  {
    res.status(300).send({message: "New movie not added. Must have valid Title and Plot!"});
  }
 
});

// curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5000/movies/573a1390f29313caabcd42e8

router.put("/:id", async (req, res, next) => {
  //Check if movie to be updated exists
  const searchedMovie = movieData.getById(req.params.id);
  if (searchedMovie)
  {
    //
    if (!req.body.plot){
      
      res.status(300).send({ Error: 'Movie Plot value can not be blank!' });
    }
    else
    {
      const updated = itemData.updateById(req.params.id, req.body)
      let updatedList = await movieData.updateById(req.params.id, req.body)
      res.status(200).send(updatedList);
    }
  }
  else 
  {
    res.status(200).send({ Text: 'Movie not found!' });
  }
});

// curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd4135
router.delete("/:id", (req, res, next) => {
  
  
  const result = movieData.deleteById(req.params.id)
  if (result)
  {
    res.status(200).send({result});
  }
  else
  res.status(301).send({ error: 'Movie was not found therefore not deleted!' });
  
});

module.exports = router;