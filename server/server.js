const express = require('express');
const app = express();
const pg = require('pg');
const bodyParser = require('body-parser');
const Pool = pg.Pool
const PORT = 5000
app.use(bodyParser.json());


const pool = new Pool ({
    database: 'shoe_store',
    host: 'localHost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('Postman connected');

});

pool.on('error', (error) => {
    console.log('Error with Postman pool', error);
});

app.use(express.static('server/public'));


const shoes = [
    {
        name: 'sandals',
        cost: '15',
        socks: 'false'
    }
];

app.get('/shoes', (req, res) => {
    console.log('GET /shoes');
    pool.query(`SELECT * FROM "shoes"`)
    //the shoe.name and shoe.cost is the sanitization for security
    .then((results) => {
        res.send(results.row);
})
.catch((error) => {
    console.log('Error with SQL GET', error);
    res.sendStatus(500)
});
    // res.send(shoes);
});

app.post('/shoes', (req, res) => {
    const shoe = req.body;
    pool.query(`INSERT INTO "shoes" ("name", "cost")
                VALUES ($1, $2);`, [shoe.name, shoe.cost]) 
                //the shoe.name and shoe.cost is the sanitization for security
            .then((results) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log('error with SQL INSERT', error);
                res.sendStatus(500)
            });
    // shoes.push(req.body);

});

// router.post('/', (req, res) => {
//     const shoe = req.body;
//     pool.query(`INSERT INTO "shoes" ("name", "cost")
//                 VALUES ($1, $2);`, [shoe.name, shoe.cost])
//         .then(() => {
//             res.sendStatus(200);
//         })
//         .catch((error) => {
//             console.log('error with SQL INSERT', error);
//             res.sendStatus(500);
//         });
// });

app.listen(PORT, function (req, res) {
    console.log('Listening on port', PORT);
});
