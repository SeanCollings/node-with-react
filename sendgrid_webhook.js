const localtunnel = require('localtunnel');

localtunnel(5000, {
  subdomain: '34jk5ndfvzc0jkrowlin'
}, function (err, tunnel) {
  console.log('LT running')
});