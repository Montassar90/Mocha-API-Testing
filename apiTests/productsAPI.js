const axios = require("axios");
const { expect } = require("chai");
const config = require("../config.json");

describe("Products API Requests Tests", () => {
  it("GET request to get all products list", async () => {
    const response = await axios.get(
      config.Test.API_URL + config.Test.productsListAPI
    );
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("object");
    expect(response.data).to.not.be.null;
    expect(response.data.products).to.be.an("array");
    expect(response.data.responseCode).to.equal(200);
    response.data.products.forEach((product) => {
      expect(product).to.include.keys(
        "id",
        "name",
        "price",
        "brand",
        "category"
      );
    });
  });

  it("POST request to all products list", async () => {
    const response = await axios.post(
      config.Test.API_URL + config.Test.productsListAPI
    );
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("object");
    expect(response.data).to.not.be.null;
    expect(response.data.responseCode).to.equal(405);
    expect(response.data.message).to.equal(
      "This request method is not supported."
    );
  });

  it("POST request to search product", async () => {
    const reqParam = new URLSearchParams({ search_product: "jean" }).toString();
    const response = await axios.post(
      config.Test.API_URL + config.Test.searchProductAPI,
      reqParam
    );
    expect(response.status).to.equal(200);
    expect(response.data).to.not.be.null;
    expect(response.data.responseCode).to.equal(200);
    response.data.products.forEach((product) => {
      expect(product).to.include.keys(
        "id",
        "name",
        "price",
        "brand",
        "category"
      );
      expect(product).to.be.an("object");
    });
  });

  it("POST request to search product without search parameter", async () => {
    const response = await axios.post(
      config.Test.API_URL + config.Test.searchProductAPI);
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("object");
    expect(response.data).to.not.be.null;
    expect(response.data.responseCode).to.equal(400);
    expect(response.data.message).to.equal("Bad request, search_product parameter is missing in POST request.");
  });

});
