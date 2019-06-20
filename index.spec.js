const request = require("supertest");
const server = require("./index.js");
require("dotenv").config();
const Characters = require("./data/models/characterModel");
const db = require("./dbConfig");

describe("server.js", () => {
  describe("index route", () => {
    it("test env port", async () => {
      expect(process.env.PORT_ENV).toEqual("9090");
    });

    it("test env db config", async () => {
      expect(process.env.DB_ENV).toEqual("testing");
    });

    it("should return an OK status code from the index route", async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get("/");
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return a JSON object from the index route", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/");
      expect(response.body).toEqual(expectedBody);
    });

    it("should return a JSON object from the index route", async () => {
      const response = await request(server).get("/");
      expect(response.type).toEqual("application/json");
    });
  });


  describe("characters tests", () => {
    beforeEach(() => {
      return db("characters").truncate();
    });
    it("should insert a character into the db", async () => {
      await Characters.insert({ name: "Joker", series: "Persona" });

      const characters = await db("characters");

      expect(characters.length).toBe(1);
      expect(characters[0].name).toBe("Joker");
    });

    it("should delete a character from the db", async () => {
      await Characters.insert({ name: "Joker", series: "Persona" });

      const characters = await db("characters");

      expect(characters.length).toBe(1);
      expect(characters[0].name).toBe("Joker");

      await Characters.deleteCharacters();

      const character = await db("characters");
      expect(character.length).toBe(0);
    });
  });
});
