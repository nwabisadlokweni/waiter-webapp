const assert = require('assert');
const waiterFactory = require('../waiter');

const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/waiter_tests';

const pool = new Pool({
    connectionString
});

let waiter = waiterFactory(pool);

describe('The basic database web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("drop table bhelekazi;");
        await pool.query("drop table waiters;");
        await pool.query("create table waiters(id serial not null primary key,names text not null)")
        await pool.query("create table bhelekazi( id serial not null primary key,waiters_id int not null,weekdays_id int not null,foreign key (waiters_id) references waiters(id),foreign key (weekdays_id) references weekdays(id))")
    });

    it('should be able to insert 1 waiter name on the database', async function () {
        await waiter.addNames('nwabisa');

        var names = await waiter.getNames()
        assert.deepEqual([{ names: 'nwabisa' }], names);
    })

    it('should be able to insert multiple waiters names on the database', async function () {

        await waiter.addNames('Nwabisa');
        await waiter.addNames('Zola');
        await waiter.addNames('Sino');
        await waiter.addNames('Mandisa');
        await waiter.addNames('Namhla');
        await waiter.addNames('Chuma');

        var names = await waiter.getNames()

        assert.deepEqual([{ names: 'Nwabisa' },
        { names: 'Zola' },
        { names: 'Sino' },
        { names: 'Mandisa' },
        { names: 'Namhla' },
        { names: 'Chuma' }], names);
    })

    it('should show all the days', async function () {
        await waiter.getDays();

        assert.deepEqual(await waiter.getDays(),
            [{ days: "Monday" },
            { days: "Tuesday" },
            { days: "Wednesday" },
            { days: "Thursday" },
            { days: "Friday" },
            { days: "Saturday" },
            { days: "Sunday" }])

    })

    it('should be able to reset the shifts from the database', async function () {

        assert.deepEqual(await waiter.reset(), []);
    });

    after(function () {
        pool.end();
    })

});