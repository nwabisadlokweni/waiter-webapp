const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const waiterFactory = require('./waiter');
//const routeFactory = require('./waiter-routes')
const pg = require("pg");
const Pool = pg.Pool;
const _ = require("lodash");


const app = express();

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/waiter_webapp';

const pool = new Pool({
    connectionString
});

const waiter = waiterFactory(pool);
//const routesInstance = routeFactory(registration)

app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: "fcsss",
    resave: false,
    saveUninitialized: true
}))
// initialise the flash middleware
app.use(flash());

app.get('/', function (req, res) {
    
    res.render('index')
})

app.get('/waiters/:username', async function (req, res) {
    const username1 = _.capitalize(req.params.username);
//    const names = await waiter.addNames()

    res.render('waiters', {
        username: username1
        //  message: names 
    })
})

//adding the names to the db
app.post('/waiters/:username', async function (req, res) {
    // const username = await waiter.getNames();
    const username1 =  _.capitalize(req.params.username);
    const week = req.body.day;
    await waiter.addNames(username1)
    const both = await waiter.getTheShifts(week, username1 )
    //console.log(week)
    res.render('waiters', {both})
})

app.get('/waiters', async function (req, res) {
    const username1 =  _.capitalize(req.params.username);

    res.render('waiters', {
         username: username1
    })
})

app.get('/days', async function (req, res) {
    const selectedDay = await waiter.getDays();
    //console.log(selectedDay);
    
    const selectedWaiter = await waiter.getNames()
    //console.log(selectedWaiter);
    
   // const display = await waiter.getTheShifts(shifts, names)
    //console.log(display);
    
    res.render('administrator',{
        selectedDay,
        selectedWaiter,
        //display
    })
})

app.get('/reset', async function (req, res) {
    req.flash('resetSucceded', `You have successfully cleared your shift's table`);
    await waiter.reset()
    res.render('administrator')
})

const PORT = process.env.PORT || 2030;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});