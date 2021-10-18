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
        expect(child2.title).toBe("child2");
      });
    });
  });

  describe("endpoint GET /challenges/:id", () => {
    describe("when id is invalid", () => {
      test("it should response error for invalid", async () => {
        await request(app)
          .get("/challenges/invalid")
          .expect(400)
          .expect("Content-Type", /json/)
          .expect({ error: "invalid challenge id" });
      });
    });

    describe("when id is valid", () => {
      let challengeId = "";

      beforeAll(async () => {
        try {
          await insertMockData();
        } catch (err) {
          console.error(`err: ${err} cannot create mock challenges`);
        }

        const { body: { challenges } } = await request(app).get("/challenges");

        challengeId = challenges[0]._id;
      });

      afterAll(async () => {
        try {
          await Challenge.deleteMany();
        } catch (err) {
          console.error(`err: ${err} cannot delete mock challenges`);
        }
      });

      test("it should response data", async () => {
        const res = await request(app).get(`/challenges/${challengeId}`)
          .expect(200)
          .expect("Content-Type", /json/);
        const challenge = res.body;

        expect(challenge).toBeTruthy();
        expect(challenge._id).toBe(challengeId);
        expect(challenge.name).toBe("test");
        expect(challenge.elementTree).toMatchObject({ title: "parent" });
      });

      test("it should response populated data", async () => {
        const { body: challenge } = await request(app).get(`/challenges/${challengeId}`);

        expect(challenge.elementTree.block).toMatchObject({
          isContainer: true,
          property: {
            style: {
              display: "flex",
              justifyContent: "center"
            }
          },
          tagName: "div"
        });
      });

      test("it should response nested populated data", async () => {
        const { body: challenge } = await request(app).get(`/challenges/${challengeId}`);

        expect(challenge.elementTree.childTrees.length).toBe(2);

        const [child1, child2] = challenge.elementTree.childTrees;

        expect(child1.title).toBe("child1");
        expect(child2.title).toBe("child2");

        expect(child1).toMatchObject({
          title: "child1",
          isSubChallenge: false,
          block: {
            tagName: "span",
            isContainer: false,
            property: {
              text: "child1"
            }
          }
        });

        expect(child2).toMatchObject({
          title: "child2",
          isSubChallenge: true,
          block: {
            tagName: "div",
            isContainer: true,
            property: {
              text: "child2"
            }
          }
        });
        expect(child2.childTrees.length).toBe(1);

        const grandChild = child2.childTrees[0];

        expect(grandChild).toMatchObject({
          title: "grandChild",
          isSubChallenge: false,
          block: {
            tagName: "span",
            isContainer: false,
            property: {
              text: "grandChild"
            }
          }
        });
      });
    });
  });
});
