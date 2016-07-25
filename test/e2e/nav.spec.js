const url = 'http://localhost:3000/nav';
const addUrl = 'http://localhost:3000/add-text';

module.exports = {

  before (client) {
    client.url(url).waitForElementVisible('body', 1000);
  },

  'Assert add link' (client) {
    client.click('[href="/add-text"]');
    client.assert.urlEquals(addUrl);
    client.url(url).waitForElementVisible('body', 1000);
  },

  'Assert links' (client) {
    client.elements('css selector', '[href^="./texts/"]', res => {
      const links = res.value;
      client.expect(links).to.have.length.above(1);
    });
  },

  after (client) {
    client.end();
  }

};
