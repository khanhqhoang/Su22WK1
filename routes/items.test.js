const request = require("supertest");

const movieData = require('../dataInterface/movies');
const server = require("../server");

describe("/movies", () => {
  let movies;
  beforeEach(() => {
    movies = [{ id: 'test1', field: 'val1' }, { id: 'test2', field: 'val2' }];
    movieData.movies = [...movies];
  });

  describe("GET /", () => {
    it("should return all movies", async () => {
      const res = await request(server).get("/movies");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(movies);
    });
  });

  describe("GET /:id", () => {
    it("should return item by id", async () => {
      const res = await request(server).get("/movies/test2");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(movies[1]);
    });
    it("should return 404 if item does not exist", async () => {
      const res = await request(server).get("/movies/other");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("POST /", () => {
    it("should create a new item", async () => {
      const item = { field: 'different', newKey: 'other val' };
      const res = await request(server).post("/movies").send(item);
      expect(res.statusCode).toEqual(200);
      expect(movieData.movies.length).toEqual(3);
      expect(movieData.movies[2]).toMatchObject(item);
      //check to ensure the field value is not blank when adding new item
      expect(movieData.movies[2].field.length) > 0;
      expect(typeof movieData.movies[2].id).toEqual('string');
      expect(movieData.movies[2].id).toHaveLength(36);
    });
  });

  describe("PUT /", () => {
    it("should update an item but not change its id", async () => {
      const item = { field: 'updated', id: 'new' };
      const res = await request(server).put("/movies/test1").send(item);
      //check to ensure the field value is not blank when adding new item
      expect(item.field.length) > 0;
      expect(res.statusCode).toEqual(200);
      expect(movieData.movies.length).toEqual(2);
      expect(movieData.movies[0]).toEqual({ id: 'test1', field: 'updated' });
    });

    it("should update a different item but not change its id", async () => {
      const item = { field: 'Updated', id: 'new2' };
      const res = await request(server).put("/movies/test2").send(item);
      //check to ensure the field value is not blank when adding new item
      expect(item.field.length) > 0;
      expect(res.statusCode).toEqual(200);
      expect(movieData.movies.length).toEqual(2);
      expect(movieData.movies[1]).toEqual({ id: 'test2', field: 'Updated' });
    });

    it("should do nothing if id does not exist", async () => {
      const item = { field: 'Updated', id: 'new' };
      const res = await request(server).put("/movies/new").send(item);
      expect(res.statusCode).toEqual(200);
      expect(movieData.movies.length).toEqual(2);
      expect(movieData.movies).toEqual(movies);
    });
  });

  describe("DELETE /:id", () => {
    it("should delete an item", async () => {
      const res = await request(server).delete("/movies/test1");
      expect(res.statusCode).toEqual(200);
      expect(movieData.movies.length).toEqual(1);
      expect(movieData.movies).toEqual([movies[1]]);
    });
    it("should delete a different item", async () => {
      const res = await request(server).delete("/movies/test2");
      expect(res.statusCode).toEqual(200);
      expect(movieData.movies.length).toEqual(1);
      expect(movieData.movies).toEqual([movies[0]]);
    });
  });


});
