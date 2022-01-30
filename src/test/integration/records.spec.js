const app = require("../../app");
const supertest = require("supertest");
const mocks = require('../mock');

jest.mock('../../components/mongoclient');
const mongoclient = require('../../components/mongoclient');

describe('POST /', () => {
    test('should return HTTP 200 on happy path', async () => {
        mongoclient.findByDate.mockImplementation(() => mocks.mockMongoDBResponse);
        await supertest(app)
            .post("/")
            .send({
                startDate: "2016-01-26",
                endDate: "2016-02-02",
                minCount: 2000,
                maxCount: 3000
            })
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body.records)).toBeTruthy();
                expect(response.body.code).toEqual(0);
                expect(response.body.msg).toEqual('Success');
            })
    });

    test('should return HTTP 200 if no records are found within specified date', async () => {
        mongoclient.findByDate.mockImplementation(() => []);
        await supertest(app)
            .post("/")
            .send({
                startDate: "2016-01-26",
                endDate: "2016-02-02",
                minCount: 2000,
                maxCount: 3000
            })
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body.records)).toBeTruthy();
                expect(response.body.code).toEqual(0);
                expect(response.body.msg).toEqual('Success');
            })
    });

    test('should return HTTP 400 for invalid input', async () => {
        await supertest(app).post("/", {
            startDate: "2016-01-26",
            endDate: "2016-02-02",
            minCount: "A",
            maxCount: 3000
        })
            .expect(400)
            .then((response) => {
                expect(response.body.code).toEqual(1);
                expect(response.body.msg).toEqual('Invalid input format');
            })
    });
})