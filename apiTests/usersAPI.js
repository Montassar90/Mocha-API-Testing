const axios = require("axios");
const { expect } = require("chai");
const config = require("../config.json");
const userCredentials = require("../userCredentials.json");
const FormData = require("form-data");

describe("Users API Requests Tests", () => {
  it("POST request to create a new user", async () => {
    const reqParam = new URLSearchParams({
      name: userCredentials.name,
      email: userCredentials.email,
      password: userCredentials.password,
      title: userCredentials.title,
      birth_date: userCredentials.day,
      birth_month: userCredentials.month,
      birth_year: userCredentials.year,
      firstname: userCredentials.firstName,
      lastname: userCredentials.lastName,
      address1: userCredentials.address,
      city: userCredentials.city,
      state: userCredentials.state,
      zipcode: userCredentials.zip,
      country: userCredentials.country,
      mobile_number: userCredentials.mobile,
    }).toString();
    const response = await axios.post(
      config.Test.API_URL + config.Test.createUserAPI,
      reqParam
    );
    expect(response.status).to.equal(200);
    expect(response.data).to.not.be.null;
    expect(response.data.responseCode).to.equal(201);
  });

  it("DELETE request to delete user account", async () => {
    const formData = new FormData();
    formData.append("email", userCredentials.email);
    formData.append("password", userCredentials.password);

    const response = await axios.request({
      method: "delete",
      url: config.Test.API_URL + config.Test.deleteUserAPI,
      data: formData,
    });
    expect(response.status).to.equal(200);
    expect(response.data).to.not.be.null;
    expect(response.data.responseCode).to.equal(200);
    expect(response.data.message).to.equal("Account deleted!");
  });
});
