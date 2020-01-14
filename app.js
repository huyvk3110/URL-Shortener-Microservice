const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerApi = require('./router/router.api');

const app = express();
mongoose.connect('mongodb+srv://huyvk3110:q1qtoJ8husVoTZZE@cluster0-2v6km.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use('/api', routerApi);

const listen = app.listen(process.env.PORT || 3000, function () {
    console.log('Server start at: ', listen.address().port);
})