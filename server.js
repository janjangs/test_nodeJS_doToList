const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getListData', function (req, res) {
    fs.readFile(__dirname + "/" + "store.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

app.get('/getById/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "store.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        const getId = req.params.id
        const dataAll = data.data
        const getData = dataAll.find(data => data.id == getId);
        if (getData && getData != "") {
            res.status(200).end(JSON.stringify(getData));
        } else {
            message = { message: "No Data" }
            res.status(401).end(JSON.stringify(message));
        }

    });
})

app.post('/addData', function (req, res) {
    fs.readFile(__dirname + "/" + "store.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        const id = data.data[data.data.length - 1].id + 1
        if (req.body.text && req.body.text != "") {
            const text = req.body.text
            data.data.push({ id: id, text: text })
            console.log(data);
            fs.writeFileSync(__dirname + "/" + "store.json", JSON.stringify(data));
            res.status(200).end(JSON.stringify(data));
        } else {
            message = { message: "Please enter the text you save." }
            res.status(400).end(JSON.stringify(message));
        }
    });
})

var server = app.listen(8888, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})