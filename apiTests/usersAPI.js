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
      company: userCredentials.company,
      address1: userCredentials.address,
      city: userCredentials.city,
      state: userCredentials.state,
      zipcode: userCredentials.zipCode,
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
    expect(response.data.message).to.equal("User created!");
  });

  it("POST request to verify Login with valid details", async () => {
    const formData = new FormData();
    formData.append("email", userCredentials.email);
    formData.append("password", userCredentials.password);

    const response = await axios.request({
      method: "post",
      url: config.Test.API_URL + config.Test.loginAPI,
      data: formData,
    });
    expect(response.status).to.equal(200);
    expect(response.data).to.not.be.null;
    expect(response.data.responseCode).to.equal(200);
    expect(response.data.message).to.equal("User exists!");
  });

  it("POST request to verify Login without email parameter", async () => {
    const formData = new FormData();
    formData.append("password", userCredentials.password);

    const response = await axios.request({
      method: "post",
      url: config.Test.API_URL + config.Test.loginAPI,
      data: formData,
    });
    expect(response.status).to.equal(200);
    expect(response.data).to.not.be.null;
    expect(response.data.responseCode).to.equal(400);
    expect(response.data.message).to.equal(
      "Bad request, email or password parameter is missing in POST request."
    );
  });

  it("DELETE request to verify Login", async () => {
    const response = await axios.delete(
      config.Test.API_URL + config.Test.loginAPI
    );
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("object");
    expect(response.data).to.not.be.null;
    expect(response.data.responseCode).to.equal(405);
    expect(response.data.message).to.equal(
      "This request method is not supported."
    );
  });

  it("POST request to verify Login with invalid details", async () => {
    const formData = new FormData();
    formData.append("email", userCredentials.invalidEmail);
    formData.append("password", userCredentials.invalidPassword);

    const response = await axios.request({
      method: "post",
      url: config.Test.API_URL + config.Test.loginAPI,
      data: formData,
    });
    expect(response.status).to.equal(200);
    expect(response.data).to.not.be.null;
    expect(response.data.responseCode).to.equal(404);
    expect(response.data.message).to.equal("User not found!");
  });

  it("PUT request to update user account", async () => {
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
      company: userCredentials.company,
      address1: userCredentials.address,
      city: userCredentials.city,
      state: userCredentials.state,
      zipcode: userCredentials.zipCode,
      country: userCredentials.country,
      mobile_number: userCredentials.mobile,
    }).toString();
    const response = await axios.put(
      config.Test.API_URL + config.Test.updateAPI,
      reqParam
    );
    expect(response.status).to.equal(200);
    expect(response.data).to.not.be.null;
    expect(response.data.responseCode).to.equal(200);
    expect(response.data.message).to.equal("User updated!");
  });

  it("GET request to fetch user account details by email", async () => {
    //const reqParam = new URLSearchParams({ email: userCredentials.email }).toString();
    const response = await axios.get(
      config.Test.API_URL + config.Test.userDetailsAPI,
      { params: { email: userCredentials.email } }
    );
    expect(response.status).to.equal(200);
    expect(response.data.responseCode).to.equal(200);
    expect(response.data.user).to.not.be.null;
    expect(response.data.user).to.be.an("object");
    expect(response.data.user).to.include.keys(
      "id",
      "name",
      "email",
      "title",
      "birth_day",
      "birth_month",
      "birth_year",
      "first_name",
      "last_name",
      "company",
      "address1",
      "address2",
      "city",
      "state",
      "zipcode",
      "country"
    );
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
