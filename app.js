var express = require('express');
var app = express();
var path = require('path');
var mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

var url = process.env.URI || "mongodb://blazing:blazingbane@comments-shard-00-00.9fhsn.mongodb.net:27017,comments-shard-00-01.9fhsn.mongodb.net:27017,comments-shard-00-02.9fhsn.mongodb.net:27017/test?replicaSet=atlas-2rxnym-shard-0&ssl=true&authSource=admin"
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err, db) {
    if (err) throw err;
    db.close();
});
app.set('view engine', 'ejs');
app.use("/public", express.static(path.join(__dirname, "/public")));
app.get('/', function(req, res) {
    res.render("index")
        // res.sendFile(path.join(__dirname, 'views/index.html'));
})
app.get('/pc.html', function(req, res) {
    // res.render("index")
    res.sendFile(path.join(__dirname, 'views/pc.html'));
})
var pillars = ["JayanthRaj Vipergaming War-hulk War-lord Sritan Ravan-gaming Asura-Vajresh Seven-yeshwanth Imvjgamer Rexop Baresspanda Ramp-sd Dunde-ganesh Shivanand-yadav Serious-gaming Suresh-reddy Mahesh-yadav Bewakoof-edits JSC-gaming Balagoni-gamer Arun-perem Ak-47 Sai-Krishna Pavan-gandham My3-ravi Siva-chaitanya Vinod-mourya Speedy-s9 Prabhath-verma Sunil-p Charan-cherry Harsha-reddy Sg-king Affective-gaming Imspeed Ghost-gamer Overpro-Yt Gamerd Unitedwestand Lightz Bullymaguire Chotku Gamer111 Max-master Cdking Manigamingtelugu Cyclonous Crazy Asura-rekrax Aditya-verma Abhishek monstol elcin kavin-walton ryft-yt wyatt"]

app.get('/pillers', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("youtube");
        dbo.collection("live").find({}).sort("count", -1).toArray(function(err, result) {
            if (err) throw err;
            array = result
            res.render('pillers.ejs', { array, pillars })
            db.close();
        });
    });
});
app.listen(process.env.PORT || 7979)
console.log('====================================');
console.log('sever started at 7979 for Blazing Bane mega website');