const express = require('express');
const amqp = require('amqplib');
const config = require('./config/config');

const app = express();
app.use(express.json());

let channel;
amqp.connect('amqp://admin:admin123@localhost')
  .then(conn => conn.createChannel())
  .then(ch => {
    channel = ch;
    app.listen(4000, () => console.log('Chat service running on port 4000'));
  })
  .catch(err => {
    console.error('Failed to connect to RabbitMQ:', err.message);
    process.exit(1); // Exit the process with an error code
  });

// Add this route
app.get('/', (req, res) => {
  res.send('Chat Service is running');
});

app.post('/send', (req, res) => {
  const { message } = req.body;
  channel.sendToQueue('chat', Buffer.from(message));
  res.send({ message: 'Message sent' });
});

app.get('/receive', (req, res) => {
  channel.consume('chat', msg => {
    if (msg !== null) {
      res.send({ message: msg.content.toString() });
      channel.ack(msg);
    }
  });
});

