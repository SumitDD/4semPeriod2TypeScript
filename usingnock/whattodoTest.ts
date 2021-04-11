const expect = require("chai").expect;
import app from "./whattodo";
import supertest from "supertest"
import nock from "nock";


describe("What to do endpoint", function () {
    before(() => {
        nock("https://www.boredapi.com").get("/api/activity").query(true).reply(200, { "activity": "drink a single beer" })
        nock("https://api.genderize.io?name=ivan").get("/").query(true).reply(200, { gender: 'male' })
        nock("https://api.nationalize.io?name=ivan").get("/").query(true).reply(200, { country: [{ country_id: 'HR' }] })
        nock("https://api.agify.io?name=ivan").get("/").query(true).reply(200, { age: 31 })
    })

    it("Should eventually provide 'drink a single beer'", async function () {
        const response = await supertest(app).get("/whattodo")
        expect(response.body.activity).to.be.equal("drink a single beer");
    })
    it("Should eventually be male", async function () {
        const response = await supertest(app).get("/nameinfo/:name")
        expect(response.body.gender).to.be.equal("male");
    })


})

