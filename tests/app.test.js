const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Url = require("../models/url");

const user = { email: "syamaktaheriewww@gmail.com", password: "2345488787@St" };

// clear database before starting tests

beforeAll(async () => {
    await User.deleteMany();
    await Url.deleteMany();
});

// testing signin user and check various state of respond

describe('POST /signin', () => {
    let token, code;
    it('given the user succussefully saved to mongodb, responds with 201', async () => {
        const response = await request(app)
            .post('/api/auth/signin')
            .type("json")
            .send(user);
        expect(response.status).toBe(+process.env.CREATED);
    });

    it('given the user already exist, responds with 409', async () => {
        const response = await request(app)
            .post('/api/auth/signin')
            .type("json")
            .send(user);
        expect(response.status).toBe(+process.env.CONFLICT);
    });

    it('given the user data is not valid, responds with 406', async () => {
        const response = await request(app)
            .post('/api/auth/signin')
            .type("json")
            .send({ email: "sya1gmail.com", password: "234548" });
        expect(response.status).toBe(+process.env.NOT_VALID);
    });

});

// testing login user and check various state of respond

describe('POST /login', () => {
    it('given the user exist and password is true, responds with 200', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .type("json")
            .send(user);
        expect(response.status).toBe(+process.env.OK);
        token = "berar " + response.body.token;
    });

    it('given the user is not exist or password is wrong, responds with 404', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .type("json")
            .send({ username: 'john', email: "s@gmail.com", password: "2345488787@St" });
        expect(response.status).toBe(+process.env.NOT_FOUND);
    });
});

// testing creating a short URL and check various state of respond

describe('POST /shorten', () => {
    it('given the url shorten and saved to mongodb ,responds with 201', async () => {
        const response = await request(app)
            .post('/api/url/shorten')
            .set("Authorization", token)
            .type("json")
            .send({ longUrl: 'https://www.digikala.com/product/dkp-4667388/%DA%AF%D9%88%D8%B4%DB%8C-%D9%85%D9%88%D8%A8%D8%A7%DB%8C%D9%84-%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%DA%AF-%D9%85%D8%AF%D9%84-galaxy-s20-fe-5g-sm-g781bds-%D8%AF%D9%88-%D8%B3%DB%8C%D9%85-%DA%A9%D8%A7%D8%B1%D8%AA-%D8%B8%D8%B1%D9%81%DB%8C%D8%AA-128-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA-%D9%88-%D8%B1%D9%85-8-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA/' });
        expect(response.status).toBe(+process.env.CREATED);
        code = JSON.parse(response.text).urlCode;
    });
    it('given data input is not valid, responds with 406', async () => {
        const response = await request(app)
            .post('/api/url/shorten')
            .set("Authorization", token)
            .type("json")
            .send({ longUrl: '/dkp-4667388/%DA%AF%D9%88%D8%B4%DB%8C-%D9%85%D9%88%D8%A8%D8%A7%DB%8C%D9%84-%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%DA%AF-%D9%85%D8%AF%D9%84-galaxy-s20-fe-5g-sm-g781bds-%D8%AF%D9%88-%D8%B3%DB%8C%D9%85-%DA%A9%D8%A7%D8%B1%D8%AA-%D8%B8%D8%B1%D9%81%DB%8C%D8%AA-128-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA-%D9%88-%D8%B1%D9%85-8-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA/' });
        expect(response.status).toBe(+process.env.NOT_VALID);
    });
    // it('given the token is wrong, responds with 401', async () => {
    //     token = token + "wrong token";
    //     const response = await request(app)
    //         .post('/api/url/shorten')
    //         .set("Authorization", token)
    //         .type("json")
    //         .send({ longUrl: 'https://www.digikala.com/product/dkp-4667388/%DA%AF%D9%88%D8%B4%DB%8C-%D9%85%D9%88%D8%A8%D8%A7%DB%8C%D9%84-%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%DA%AF-%D9%85%D8%AF%D9%84-galaxy-s20-fe-5g-sm-g781bds-%D8%AF%D9%88-%D8%B3%DB%8C%D9%85-%DA%A9%D8%A7%D8%B1%D8%AA-%D8%B8%D8%B1%D9%81%DB%8C%D8%AA-128-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA-%D9%88-%D8%B1%D9%85-8-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA/' });
    //     expect(response.status).toBe(+process.env.UNAUTHORIZED);
    // });
});

// testing geting user URL's and check various state of respond

describe('GET /urls', () => {
    it('given the user has url and authorized, responds with 302', async () => {
        const response = await request(app)
            .get(`/api/url`)
            .set("Authorization", token)
        expect(response.status).toBe(+process.env.OK);
    });

    // it('given the user authorized but has not url, responds with 404', async () => {
    //     const response = await request(app)
    //         .get(`/api/url`)
    //         .set("Authorization", token)
    //     expect(response.status).toBe(+process.env.NOT_OK);
    // });

    // it('given the user has url but not authorized, responds with 404', async () => {
    //     const response = await request(app)
    //         .get(`/api/url`)
    //         .set("Authorization", token + "wrong")
    //     expect(response.status).toBe(+process.env.NOT_OK);
    // });
});

// testing geting redirect to oringinal  URL and check various state of respond

describe('GET /:code', () => {
    it('given the code is exist, responds with 200', async () => {
        const response = await request(app)
            .get("/" + code);
        expect(response.status).toBe(+process.env.REDIRECTED);
    });

    it('given the code is not exist, responds with 404', async () => {
        const response = await request(app)
            .get("/wrong" + code);
        expect(response.status).toBe(+process.env.NOT_FOUND);
    });
});

// testing deleting a URL and check various state of respond

describe('DELETE /delete/:code', () => {
    it('given the code is wrong and url not found ,responds with 404', async () => {
        const response = await request(app)
            .delete(`/api/url/delete/${code}wrong`)
            .set("Authorization", token)
        expect(response.status).toBe(+process.env.NOT_FOUND);
    });

    it('given the url find and delete ,responds with 202', async () => {
        const response = await request(app)
            .delete(`/api/url/delete/${code}`)
            .set("Authorization", token)
        expect(response.status).toBe(+process.env.ACCEPTED);
    });

    // it('given the code is wrong and url not found ,responds with 404', async () => {
    //     const response = await request(app)
    //         .delete(`/api/url/delete/${code}`)
    //         .set("Authorization", token + "wrong")
    //     expect(response.status).toBe(+process.env.UNAUTHORIZED);
    // });
});
