const express = require('express')
const line = require('@line/bot-sdk');
const path = require('path')
const PORT = process.env.PORT || 5000

const config = {
  channelAccessToken: 'hM9udHFKbfItO690aGJsC+K2+e1S6fYPAKtpjS69WLcXVMYaaprzNVhuDnu0xKxrcI1Sp6WmtXc67GcK/I2FB1aVxKgRVoOauSczVuhvStrgQoZthquemXEo9BCtJQyj44hIQhZtPXGP7cwuCpvOPQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '497bf56799d2d1558380940e07a03c7d'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(8080);

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
