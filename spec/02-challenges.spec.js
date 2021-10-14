const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const { connectDb, disconnectDb } = require("./db");

const Challenge = require("../models/Challenge");
const BlockTree = require("../models/BlockTree");
const { insertMockData } = require("./mockData");

const TIME_OUT = 20000;

beforeAll(async () => connectDb());
afterAll(async () => disconnectDb());

describe("challenge controller test", () => {
  jest.setTimeout(TIME_OUT);

  describe("endpoint GET /challenges", () => {
    describe("when db is empty", () => {
      test("it should response empty array", async () => {
        await request(app)
          .get("/challenges")
          .expect(200)
          .expect("Content-Type", /json/)
          .expect({ challenges: [] });
      });
    });

    describe("when db has one data", () => {
      beforeEach(async () => {
        try {
          await insertMockData();
        } catch (err) {
          console.error(`err: ${err} cannot create mock challenges`);
        }
      });

      afterEach(async () => {
        try {
          await Challenge.deleteMany();
        } catch (err) {
          console.error(`err: ${err} cannot delete mock challenges`);
        }
      });

      test("it should response data", async () => {
        const res = await request(app)
          .get("/challenges")
          .expect(200)
          .expect("Content-Type", /json/);
        const { challenges } = res.body;

        expect(challenges.length).toBe(1);
        expect(challenges[0]).toMatchObject({
          _id: expect.any(String),
          name: "test",
          elementTree: expect.any(String)
        });

        const { _id, elementTree } = challenges[0];

        expect(mongoose.Types.ObjectId.isValid(_id)).toBeTruthy();
        expect(mongoose.Types.ObjectId.isValid(elementTree)).toBeTruthy();

        const challenge = await Challenge.findById(_id);

        expect(challenge).toMatchObject({
          _id: mongoose.Types.ObjectId(_id),
          name: "test",
          elementTree: mongoose.Types.ObjectId(elementTree)
        });

        const blockTree = await BlockTree.findById(elementTree);

        expect(blockTree).toMatchObject({
          _id: mongoose.Types.ObjectId(elementTree),
          title: "parent",
          isSubChallenge: true
        });

        expect(blockTree.childTrees.length).toBe(2);

        const [child1, child2] = blockTree.childTrees;

        expect(child1.title).toBe("child1");
        expect(child2.block.property.text).toBe("child2");
      });
    });
  });
});
