const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');

const router = express.Router();
const Schema = mongoose.Schema;

const shortUrlSchemal = new Schema({
    url: { type: String, require: true },
    short: { type: String, require: true },
})

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchemal);

router.post('/shorturl/new', function (req, res) {
    const { url } = req.body;
    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    if (validURL(url)) {
        ShortUrl.find((err, data) => {
            if (err) return res({ "error": "unknow" })
            let shortData = new ShortUrl({
                url: url,
                short: data.length
            })
            shortData.save(function (err, data) {
                if (err) return res({ "error": "unknow" })
                res.json({ original_url: data.url, short_url: data.short });
            })
        });
    } else {
        res.json({ "error": "invalid URL" })
    }
})

router.get('/shorturl/:shortId', function (req, res) {
    const { shortId } = req.params;
    ShortUrl.findOne({ short: shortId.toString() }, function (err, data) {
        if (err) return res.json({ "error": "error" })
        res.redirect(data.url);
    })
})

module.exports = router;