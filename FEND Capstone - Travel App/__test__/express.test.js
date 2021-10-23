import app from '../src/Server/server';

//const app = require('../src/Server/server');

const supertest = require('supertest');
const request = supertest(app)

it("Test for /all", async () => {
    const response = await request.get("/all");
    return response;
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });