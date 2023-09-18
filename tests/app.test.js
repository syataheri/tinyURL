const supertest = require("supertest");
const mongoose  = require( "mongoose" );
const { app } = require("../app");
const { User } = require("../models/user");
const { Url } = require("../models/url");

const user = { email: "syamaktaheriewww@gmail.com", password: "2345488787@St" };
const request = supertest.agent(app)

// clear database before starting tests

beforeAll(async () => {
  jest.setTimeout(30000); // Increase timeout in case internet connection was slow
});

let token, code;

// testing signup user and check various state of respond
describe("POST /signup", () => {
  jest.setTimeout(30000);
  it("given the user succussefully saved to mongodb, responds with 201", async () => {
    const response = await request
      .post("/api/auth/signup")
      .type("json")
      .send(user);
    expect(response.status).toBe(201);
  });

  it("given the user already exist, responds with 409", async () => {
    const response = await request
      .post("/api/auth/signup")
      .type("json")
      .send(user);
    expect(response.status).toBe(409);
  });

  it("given the user data is not valid, responds with 406", async () => {
    const response = await request
      .post("/api/auth/signup")
      .type("json")
      .send({ email: "sya1gmail.com", password: "234548" });
    expect(response.status).toBe(406);
  });
});

// testing login user and check various state of respond

describe("POST /login", () => {
  it("given the user exist and password is true, responds with 200", async () => {
    const response = await request
      .post("/api/auth/login")
      .type("json")
      .send(user);
    expect(response.status).toBe(200);
    token = "berar " + response.body.token;
  });

  it("given the email does not exist, responds with 404", async () => {
    const response = await request
      .post("/api/auth/login")
      .type("json")
      .send({
        username: "john",
        email: "s@gmail.com",
        password: "2345488787@St",
      });
    expect(response.status).toBe(401);
  });

  it("given the password is wrong, responds with 404", async () => {
    const response = await request
      .post("/api/auth/login")
      .type("json")
      .send({
        username: "john",
        email: user.email,
        password: "23454sdsd$T",
      });
    expect(response.status).toBe(401);
  });
});

// testing creating a short URL and check various state of respond

describe("POST /shorten", () => {
  it("given the url shorten and saved to mongodb ,responds with 201", async () => {
    const response = await request
      .post("/api/url/shorten")
      .set("Authorization", token)
      .type("json")
      .send({
        longUrl:
          "https://www.digikala.com/product/dkp-4667388/%DA%AF%D9%88%D8%B4%DB%8C-%D9%85%D9%88%D8%A8%D8%A7%DB%8C%D9%84-%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%DA%AF-%D9%85%D8%AF%D9%84-galaxy-s20-fe-5g-sm-g781bds-%D8%AF%D9%88-%D8%B3%DB%8C%D9%85-%DA%A9%D8%A7%D8%B1%D8%AA-%D8%B8%D8%B1%D9%81%DB%8C%D8%AA-128-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA-%D9%88-%D8%B1%D9%85-8-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA/",
      });
    expect(response.status).toBe(201);
    code = JSON.parse(response.text).code;
  });
  it("given data input is not valid, responds with 406", async () => {
    const response = await request
      .post("/api/url/shorten")
      .set("Authorization", token)
      .type("json")
      .send({
        longUrl:
          "/dkp-4667388/%DA%AF%D9%88%D8%B4%DB%8C-%D9%85%D9%88%D8%A8%D8%A7%DB%8C%D9%84-%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%DA%AF-%D9%85%D8%AF%D9%84-galaxy-s20-fe-5g-sm-g781bds-%D8%AF%D9%88-%D8%B3%DB%8C%D9%85-%DA%A9%D8%A7%D8%B1%D8%AA-%D8%B8%D8%B1%D9%81%DB%8C%D8%AA-128-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA-%D9%88-%D8%B1%D9%85-8-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA/",
      });
    expect(response.status).toBe(406);
  });
  it("given the token is wrong, responds with 401", async () => {
    const response = await request
      .post("/api/url/shorten")
      .set("Authorization", token + "wrong")
      .type("json")
      .send({
        longUrl:
          "https://www.digikala.com/product/dkp-4667388/%DA%AF%D9%88%D8%B4%DB%8C-%D9%85%D9%88%D8%A8%D8%A7%DB%8C%D9%84-%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%DA%AF-%D9%85%D8%AF%D9%84-galaxy-s20-fe-5g-sm-g781bds-%D8%AF%D9%88-%D8%B3%DB%8C%D9%85-%DA%A9%D8%A7%D8%B1%D8%AA-%D8%B8%D8%B1%D9%81%DB%8C%D8%AA-128-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA-%D9%88-%D8%B1%D9%85-8-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA/",
      });
    expect(response.status).toBe(401);
  });
});

// testing geting user URL's and check various state of respond

describe("GET /urls", () => {
  it("given the user has url and authorized, responds with 200", async () => {
    const response = await request
      .get(`/api/url`)
      .set("Authorization", token);
    expect(response.status).toBe(200);
  });

  it("given the user has url but not authorized, responds with 404", async () => {
    const response = await request
      .get(`/api/url`)
      .set("Authorization", token + "wrong");
    expect(response.status).toBe(401);
  });
});

// testing geting redirect to oringinal  URL and check various state of respond

describe("GET /:code", () => {
  it("given the code is exist, responds with 302", async () => {
    const response = await request.get("/" + code);
    expect(response.status).toBe(302);
  });

  it("given the code is not exist, responds with 404", async () => {
    const response = await request.get("/wrong" + code);
    expect(response.status).toBe(404);
  });
});

// testing deleting a URL and check various state of respond

describe("DELETE /delete/:code", () => {
  it("given the code is wrong and url not found, responds with 404", async () => {
    const response = await request
      .delete(`/api/url/delete/${code}wrong`)
      .set("Authorization", token);
    expect(response.status).toBe(404);
  });

  it("given the url will be found and deleted, responds with 202", async () => {
    const response = await request
      .delete(`/api/url/delete/${code}`)
      .set("Authorization", token);
    expect(response.status).toBe(202);
  });
});

afterAll(async () => {
  await User.deleteMany();
  await Url.deleteMany();
  mongoose.disconnect();
});
