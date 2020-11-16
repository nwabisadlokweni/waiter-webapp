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
        await pool.query("delete from bhelekazi;");
        await pool.query("delete from waiters;");
    });

    // it('should be able to insert 1 waiter name on the database', async function () {
       

    //     await waiter.addNames('nwabisa');

    //     var names = await waiter.getNames()
    //     assert.deepEqual([{ names: 'nwabisa' }], names);
    // })

    // it('should be able to insert multiple waiters names on the database', async function () {
    //     let waiter = waiterFactory(pool);

    //     await waiter.addNames('Nwabisa');
    //     await waiter.addNames('Zola');
    //     await waiter.addNames('Sino');
    //     await waiter.addNames('Mandisa');
    //     await waiter.addNames('Namhla');
    //     await waiter.addNames('Chuma');

    //     var names = await waiter.getNames()

    //     assert.deepEqual([{ names: 'Nwabisa' },
    //     { names: 'Zola' },
    //     { names: 'Sino' },
    //     { names: 'Mandisa' },
    //     { names: 'Namhla' },
    //     { names: 'Chuma' }], names);
    // })




    it('should be able to get shift information', async function () {

        await waiter.addNames('Mike');

        await waiter.getTheShifts()
        await waiter.displayAdmin();

    })


    // it('should be abe to insert days that are selected on the database', async function () {
    //     let waiter = waiterFactory(pool);

    //     await waiter.selectedDays('Monday');
    //     await waiter.selectedDays('Tuesday');
    //    // await waiter.selectedDays('Wednesday');
    //     await waiter.selectedDays('Thursday');
    //     await waiter.selectedDays('Friday');
    //     await waiter.selectedDays('Saturday');
    //     await waiter.selectedDays('Sunday');

    //     var days = await waiter.getDays()

    //     assert.deepEqual([{ days: 'Monday' },
    //         { days: "Tuesday" },
    //         { days: "Wednesday" },
    //         { days: "Thursday" },
    //         { days: "Friday" },
    //         { days: "Saturday" },
    //         { days: "Sunday" }], days);
    // })

    // it('should be able to reset the shifts from the database', async function () {
    //     // the Factory Function is called greetFactory
    //     let waiter = waiterFactory(pool);
    // , [ ], 
    //     await waiter.getNames("nwabisa");

    //     var names = await waiter.reset()
    //     assert.deepEqual([], names);
    // });

    after(function () {
        pool.end();
    })

});