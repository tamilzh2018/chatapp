const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use('/api/users', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/api/chat', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true }));
app.use('/api/notifications', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));

// Add this route
app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

app.listen(8000, () => console.log('API Gateway running on port 8000'));

