const httpProxy = require('http-proxy');
const ips = process.env.IPS.split(',');
const port = process.env.PORT;
const http = require('http');
const addresses = ips.map(ip => {
  return {
    host: ip,
    port: 8080
  };
});

console.log(addresses);

let i = 0;

http.createServer((req, res, proxy) => {
  const proxiedReq = http.request({
    hostname: addresses[i].host,
    port: addresses[i].port,
    path: '/',
    method: 'GET'
  }, (proxiedRes) => {
    proxiedRes.pipe(res);
  });

  req.pipe(proxiedReq);
  i = (i + 1) % addresses.length;
}).listen(port);
