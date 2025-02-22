const axios = require('axios');
const {expect} = require('chai');
const config = require ('../config.json');

describe('Brands API Requests Tests', () => {

    it('GET request to get all brands list', async () => {
        const response = await axios.get(config.Test.API_URL + config.Test.brandsListAPI);
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('object');
        expect(response.data).to.not.be.null;
        expect(response.data.brands).to.be.an('array');
        expect(response.data.responseCode).to.equal(200);
        response.data.brands.forEach(brand => {
        expect(brand).to.include.keys('id', 'brand');
         });
      })

      it('PUT request to all brands list', async () => {
        const response = await axios.put(config.Test.API_URL + config.Test.brandsListAPI);
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('object');
        expect(response.data).to.not.be.null;
        expect(response.data.responseCode).to.equal(405);
        expect(response.data.message).to.equal('This request method is not supported.');
      })

    
});