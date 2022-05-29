var express = require('express');
var app = express();
var path = require('path');
var mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
// stats require
// const fetch = require("node-fetch");
const https = require('https');
const axios = require('axios')
const ApexM = require('./modals/Apex');
const R6API = require('r6api.js').default;

var path = require('path');
var apex = require('./stats/apex.js')
const Apex = require('./modals/Apex');
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
    // process.env.URI ||
var url = "mongodb://blazing:blazingbane@comments-shard-00-00.9fhsn.mongodb.net:27017,comments-shard-00-01.9fhsn.mongodb.net:27017,comments-shard-00-02.9fhsn.mongodb.net:27017/test?replicaSet=atlas-2rxnym-shard-0&ssl=true&authSource=admin"
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
    var url = "mongodb://blazing:blazingbane@comments-shard-00-00.9fhsn.mongodb.net:27017,comments-shard-00-01.9fhsn.mongodb.net:27017,comments-shard-00-02.9fhsn.mongodb.net:27017/test?replicaSet=atlas-2rxnym-shard-0&ssl=true&authSource=admin"
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("youtube");

        dbo.collection("donations").find({}).limit(5).sort("amt", -1).toArray(function(err, result) {
            if (err) throw err;
            array = result
            dbo.collection("donations").find({}).limit(5).sort("time", -1).toArray(function(err, result) {
                if (err) throw err;
                arrayT = result
                dbo.collection("live").find({}).sort("count", -1).limit(20).toArray(function(err, result) {
                    if (err) throw err;
                    pillars = result
                    res.render('index', { array, arrayT, pillars })
                    db.close();
                });

            });
        });
    });
    // res.render("index")
})
app.get('/pc', function(req, res) {
    res.render("pc")
        // res.sendFile(path.join(__dirname, 'views/pc.html'));
})
var pillars = ["JayanthRaj Vipergaming War-hulk War-lord Sritan Ravan-gaming Asura-Vajresh Seven-yeshwanth Imvjgamer Rexop Baresspanda Ramp-sd Dunde-ganesh Shivanand-yadav Serious-gaming Suresh-reddy Mahesh-yadav Bewakoof-edits JSC-gaming Balagoni-gamer Arun-perem Ak-47 Sai-Krishna Pavan-gandham My3-ravi Siva-chaitanya Vinod-mourya Speedy-s9 Prabhath-verma Sunil-p Charan-cherry Harsha-reddy Sg-king Affective-gaming Imspeed Ghost-gamer Overpro-Yt Gamerd Unitedwestand Lightz Bullymaguire Chotku Gamer111 Max-master Cdking Manigamingtelugu Cyclonous Crazy Asura-rekrax Aditya-verma Abhishek monstol elcin kavin-walton ryft-yt wyatt"]

app.get('/pillers', function(req, res) {
    var url = "mongodb://blazing:blazingbane@comments-shard-00-00.9fhsn.mongodb.net:27017,comments-shard-00-01.9fhsn.mongodb.net:27017,comments-shard-00-02.9fhsn.mongodb.net:27017/test?replicaSet=atlas-2rxnym-shard-0&ssl=true&authSource=admin"
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("youtube");
        dbo.collection("donations").find({}).limit(5).sort("amt", -1).toArray(function(err, result) {
            if (err) throw err;
            array = result
            total = 0
            array.forEach(element => {
                total = element.amt + total
            });
            dbo.collection("donations").find({}).limit(10).sort("time", -1).toArray(function(err, result) {
                function date(date1, date2) {
                    datef = new Date(date1).getTime()
                    datel = new Date(date2).getTime()
                    Difference_In_Time = date2 - date1;
                    Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
                    return ((datel - datef) / (1000 * 3600 * 24));
                }
                if (err) throw err;
                arrayT = result
                dbo.collection("live").find({}).sort("count", -1).toArray(function(err, result) {
                    if (err) throw err;
                    pillars = result
                    maxage = 1
                    pillars.forEach(element => {
                        age = date(element.first, element.last)
                        if (maxage < age) {
                            maxage = age
                        }
                    });
                    console.log(maxage);
                    res.render('pillers', { array, arrayT, pillars, total, maxage })
                    db.close();
                });
            });
        });
    });
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("youtube");
    //     dbo.collection("live").find({}).sort("count", -1).toArray(function(err, result) {
    //         if (err) throw err;
    //         array = result
    //         res.render('pillers.ejs', { array, pillars })
    //         db.close();
    //     });
    // });
});


//  stats site
// var express = require('express');
// const fetch = require("node-fetch");
// var app = express();
// const https = require('https');
// const axios = require('axios')
// var mongo = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;
// const ApexM = require('./modals/Apex');
var url = process.env.URI || "mongodb://root:Rlsss%405007@cluster0-shard-00-00.uj92c.mongodb.net:27017,cluster0-shard-00-01.uj92c.mongodb.net:27017,cluster0-shard-00-02.uj92c.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-fb8wzy-shard-0&authSource=admin&retryWrites=true&w=majority"
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err, db) {
    if (err) throw err;
    db.close();
});

app.get('/stats', function(req, res) {
    res.render('stats')
});
app.get('/battlefield', function(req, res) {
    res.render('bfs')
});

app.get('/bf/:Name', function(req, res) {
    var bfv = 0
    var bf1 = 0
    var bf4 = 0
    var nobf = 0
    var id = req.params.Name
    const start = async function() {
        let response4
        response4 = await axios.get(
            "https://api.gametools.network/bf4/stats/?name=" + id + "&lang=en-us", {}
        ).catch(error => {
            bf4 = undefined
        });
        let response5
        response5 = await axios.get(
            "https://api.gametools.network/bfv/all/?name=" + id + "&lang=en-us", {}
        ).catch(error => {
            bfv = undefined
        });
        if (response5.data.error) {
            bfv = undefined
        }

        // if (response4.data.error) {
        //     bf4 = undefined
        // }
        let response1
        response1 = await axios.get(
            "https://api.gametools.network/bf1/all/?name=" + id + "&lang=en-us", {}
        ).catch(error => {
            bf1 = undefined
        });
        if (response1.data.error) {
            bf1 = undefined
        }
        if (bf1 != undefined)
            bf1 = response1.data
        if (bf4 != undefined)
            bf4 = undefined
            // bf4 = response4.data

        if (bfv != undefined)
            bfv = {...response5.data }
        console.log(bf1);
        console.log(bfv);

        if (bf1 == undefined && bfv == undefined && bf4 == undefined) {
            nobf = 'Buy a Game NOOB'
        }
        res.render('bf', { bfv, bf4, bf1, id, nobf })

    }
    start()
});

app.get('/apex/:Name', function(req, res) {
    var url = "mongodb://root:Rlsss%405007@cluster0-shard-00-00.uj92c.mongodb.net:27017,cluster0-shard-00-01.uj92c.mongodb.net:27017,cluster0-shard-00-02.uj92c.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-fb8wzy-shard-0&authSource=admin&retryWrites=true&w=majority"

    const id = req.params.Name
    apex.user(id, 'PC').then(data => {
        global.ap = {...data.data }
        var obj = {};
        try {
            function data() {
                MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("Names");
                    var myobj = { uname: id };
                    dbo.collection("Apex").updateOne({ uname: id }, { $set: { uname: id } }, { upsert: true })
                });
            }

            ap.stats.forEach(element => {
                Object.assign(obj, {
                    [element.metadata.name]: element.value
                });
            });
            if (typeof ap != 'undefined') {
                data()
                res.render('apexold', { ap, obj });
            } else {
                res.render('refresh')

            }
        } catch (error) {
            res.render('refresh')
        }
    });
});

app.get('/r6/:Name', function(req, res) {
    var url = "mongodb://root:Rlsss%405007@cluster0-shard-00-00.uj92c.mongodb.net:27017,cluster0-shard-00-01.uj92c.mongodb.net:27017,cluster0-shard-00-02.uj92c.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-fb8wzy-shard-0&authSource=admin&retryWrites=true&w=majority"
    const un = req.params.Name
    const username = req.params.Name
    platform = 'uplay';

    function data() {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
            function(err, db) {
                if (err) throw err;
                var dbo = db.db("Names");
                dbo.collection("R6").updateOne({ uname: username }, { $set: { uname: username } }, { upsert: true })
            });
    }
    const start = async function() {
        var email = "kondashivaradhan007@gmail.com"
        var pass = "Rlsss@5007"
        const r6api = new R6API({ email: email, password: pass });
        // try {
        const id = await r6api.findByUsername(platform, username).then(el => el[0].userId);
        const stats = await r6api.getStats(platform, id).then(el => el[0]);
        const rank = await r6api.getRanks('uplay', id, { regions: ['apac'] });
        ba = rank[0]
        ra = rank[0].seasons[Object.keys(ba.seasons)].regions.apac
        var obj = {}

        var indu = stats.pvp.operators
            // console.log(indu);

        var dmax = 1;
        var amax = 1;
        if (typeof stats != 'undefined' && typeof ra != 'undefined') {
            var dmax = 1;
            var amax = 1;
            Object.values(indu).forEach(element => {
                if (dmax < element.kills && element.role == 'defender') {
                    dmax = element.kills
                }
            })
            Object.values(indu).forEach(element => {
                    if (amax < element.kills && element.role == 'attacker') {
                        amax = element.kills
                    }
                })
                // data()
            res.render('r6others', { indu, dmax, amax, ra, obj, stats, username });
        } else {
            res.render('refresh')
        }
        // } catch (error) {
        //     res.render('refresh')
        // }
    }
    start()

});

app.get('/discord', function(req, res) {
    res.render('discord')
});
app.get('/:User/:Legend', function(req, res) {
    const id = req.params.User
    const legend = req.params.Legend

    apex.user(id, 'PC').then(data => {

        adata = {...data.data }
        if (typeof adata != 'undefined')
            res.render('legends', { id, legend, adata })
        else {
            res.render('refresh')
        }
    });

});
app.get('/r6s', function(req, res) {
    var url = "mongodb://root:Rlsss%405007@cluster0-shard-00-00.uj92c.mongodb.net:27017,cluster0-shard-00-01.uj92c.mongodb.net:27017,cluster0-shard-00-02.uj92c.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-fb8wzy-shard-0&authSource=admin&retryWrites=true&w=majority"

    function data() {
        try {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
                if (err) throw err;
                var dbo = db.db("Names");
                dbo.collection("R6").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    obj = result;
                    var an = [];
                    for (var o in obj) {
                        an.push(obj[o].uname);
                    }
                    db.close();
                    res.render('r6s', { an: an });
                });
            });
        } catch (error) {
            console.log(error);
        }

    }
    data()
        // res.render('r6s')
});
app.get('/apex', function(req, res) {
    var url = "mongodb://root:Rlsss%405007@cluster0-shard-00-00.uj92c.mongodb.net:27017,cluster0-shard-00-01.uj92c.mongodb.net:27017,cluster0-shard-00-02.uj92c.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-fb8wzy-shard-0&authSource=admin&retryWrites=true&w=majority"

    function data() {

        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Names");
            dbo.collection("Apex").find({}).toArray(function(err, result) {
                if (err) throw err;
                obj = result;
                var an = [];
                for (var o in obj) {
                    an.push(obj[o].uname);
                }
                db.close();
                console.log(an);
                res.render('apex', { an: an });
            });
        });
    }
    data()
});
app.listen(process.env.PORT || 5000)
console.log('====================================');
console.log('sever started at 5000 for Blazing Bane mega website');