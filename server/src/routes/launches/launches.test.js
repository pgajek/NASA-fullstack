const request = require("supertest");
const app = require("../../app");

describe(" GET /launches", () => {
  it("should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});
describe(" POST /launches", () => {
  const launchData = {
    mission: "Uss Enterprise",
    rocket: "Very good rocket",
    destination: "Kepler -6",
    launchDate: "January 4, 2028",
  };
  const launchDataWithoutDate = {
    mission: "Uss Enterprise",
    rocket: "Very good rocket",
    destination: "Kepler -6",
  };
  const launchDataWithInvalidDate = {
    mission: "Uss Enterprise",
    rocket: "Very good rocket",
    destination: "Kepler -6",
    launchDate: "Here's Johnyyy!!!",
  };

  it("should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(launchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });
  it("should catch missing required property", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
  it("should catch invalid date", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
