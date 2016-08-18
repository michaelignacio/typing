'use strict';

const url = 'http://localhost:3000/';
const navUrl = 'http://localhost:3000/nav/';

module.exports = {
  tags: ['MainPage'],

  before (client) {
    client.url(url).waitForElementVisible('body', 20000);
  },

  'Assert url' (client) {
    client.assert.urlEquals(url);
  },

  'Assert nav link' (client) {
    client.click('[href="nav"]');
    client.assert.urlEquals(navUrl);
    // go back
    client.url(url).waitForElementVisible('body', 20000);
  },

  'Assert typingclub link' (client) {
    client.waitForElementVisible('[href="//typingclub.com"]', 10000);
  },

  after (client) {
    client.end();
  }

};
