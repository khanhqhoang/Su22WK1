const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://dbadmin:dbadminpw@cluster0.vxbba.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient( uri );
const databaseName = 'sample_mflix';
const collName = 'movies'
module.exports = {}
// getByTittleYear function
module.exports.getByTitleYear = async(movieTitle, movieYear) =>{
    const database = client.db(databaseName);
    const movies = database.collection(collName);
    //set query qualifier to movieTitle and Year
    //const query = { title: movieTitle, year: movieYear };
    const query = { title: movieTitle, year: Number(movieYear) };
    const options = {
        // sort matched documents in ascending order by year
        sort: { "year": 1},
        // set return attributes: title, year, runtime
        projection: {_id: 0, title: 1, year: 1, runtime: 1 }
    };

    try 
    {
        let movie = await movies.find(query, options).toArray();
        return movie;
    
    } catch (e) {
        return {message: e};
    } finally {
        await client.close();
    }
    
}
// HOMEWORK TODO: add a getByTitle function
module.exports.getByTitle = async (movieTitle) => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);
    //set query qualifier to movieTitle
    const query = { title: movieTitle };
    const options = {
        // sort matched documents in descending order by rating
        sort: { "title": -1 },
        // set return attributes: title, year, runtime
        projection: {_id: 1, title: 1, year: 1, runtime: 1 }
      };
    let movie = await movies.find(query, options).toArray();
    return movie;
}
// https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
module.exports.getAll = async () => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);
    
    const query = {}; 
    
    let movieCursor = await movies.find(query).sort({"year": 1}).limit(10).project({title: 1, runtime: 1, year: 1});  
    if (movieCursor)
    {
        return movieCursor.toArray();   
    }
    else
    {
        return {message: "No data found"};    
    }
}
// https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOne/
module.exports.getById = async (movieId) => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);
    const query = {_id: ObjectId(movieId)};

    let movie = await movies.findOne(query);
    if (movie){
        return movie;
    }
    else
    {
        
        return {message:`Movie with id: ${movieId} not found!`};
    }
    
}

// https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/delete/
module.exports.deleteById = async (movieId) => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);
    const deletionDoc = {_id:ObjectId(movieId)};
    const deleteResult = await movies.deleteOne(deletionDoc);

    return {message: `DELETED ${deleteResult.deletedCount} movies`};
}
// https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/change-a-document/
module.exports.updateById = async (movieId, newObj) => {
    //make sure plot field is not blank
    if (newObj.plot !='')
    {
        const database = client.db(databaseName);
        const movies = database.collection(collName);
        const updateDoc = { $set: {plot : newObj.plot}};
        const filter = {_id: ObjectId(movieId)};
        const result = await movies.updateOne(filter, updateDoc);

        return {message:`UPDATED ${result.modifiedCount} movies`};
    }
    else
    {
        return {message:'NO MOVIE UPDATED!'};
    }
    
}
// https://www.mongodb.com/docs/v4.4/tutorial/insert-documents/
module.exports.create = async (newObj) => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);
  
    const result = await movies.insertOne(newObj);
  
    if(result.acknowledged){
      return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` }
    } else {
      return {message: "ERROR"}
    }
  }









