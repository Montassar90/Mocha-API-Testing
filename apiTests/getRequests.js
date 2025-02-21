const axios = require('axios');
const {expect} = require('chai');
const config = require ('../config.json');

describe('GET API Request Tests', () => {

it('GET request to get all products list', async () => {
    const response = await axios.get(config.Test.API_URL + '/productsList');
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('object');
    expect(response.data).to.not.be.null;
    expect(response.data.products).to.be.an('array');
    response.data.products.forEach(product => {
    expect(product).to.include.keys('id', 'name', 'price', 'brand', 'category');
      });
})

it('GET request to get all brands list', async () => {
  const response = await axios.get(config.Test.API_URL + '/brandsList');
  expect(response.status).to.equal(200);
  expect(response.data).to.be.an('object');
  expect(response.data).to.not.be.null;
  expect(response.data.brands).to.be.an('array');
  response.data.brands.forEach(brand => {
  expect(brand).to.include.keys('id', 'brand');
   });
})
})