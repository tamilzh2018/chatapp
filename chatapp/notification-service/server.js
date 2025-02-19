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
    app.listen(5000, () => console.log('Notification service running on port 5000'));
  });

// Add this route
app.get('/', (req, res) => {
  res.send('Notification Service is running');
});

app.post('/notify', (req, res) => {
  const { notification } = req.body;
  channel.sendToQueue('notifications', Buffer.from(notification));
  res.send({ message: 'Notification sent' });
});

app.get('/receive', (req, res) => {
  channel.consume('notifications', msg => {
    if (msg !== null) {
      res.send({ notification: msg.content.toString() });
      channel.ack(msg);
    }
  });
});

