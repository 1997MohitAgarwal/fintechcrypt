// api/cors/index.js
import { createServer } from 'cors-anywhere';

const server = createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
});

export default (req, res) => {
  server.emit('request', req, res);
};
