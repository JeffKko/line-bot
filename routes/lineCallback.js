/**
 * Created by Jeff on 2016/5/4.
 */

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require("request");

var CHANNEL_ID = '<YOUR CHANNEL_ID>',
    CHANNEL_SERECT = '<YOUR CHANNEL_SERECT>',
    MID = '<YOUR MID>';


/* POST callback listing. */
router.post('/', function (req, res, next) {

    console.log("req.body.result="+req.body.result);

    var result = req.body.result;

    for(var i=0; i<result.length; i++){
        var data = result[i]['content'];
        console.log('receive: ', data);
        //go echo
        sendTextMessage(data.from, data.text);
    }
});

var LINE_API = 'https://trialbot-api.line.me/v1/events';

function sendTextMessage(sender, text) {

    var data = {
        to: [sender],
        toChannel: 1383378250,
        eventType: '138311608800106203',
        content: {
            contentType: 1,
            toType: 1,
            text: text
        }
    };

    console.log('send: ', data);

    request({
        url: LINE_API,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Line-ChannelID': CHANNEL_ID,
            'X-Line-ChannelSecret': CHANNEL_SERECT,
            'X-Line-Trusted-User-With-ACL': MID
        },
        method: 'POST',
        body: JSON.stringify(data)
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
        console.log('send response: ', body);
    });
}

module.exports = router;
