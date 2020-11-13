module.exports = function waiterFactory(pool) {

    async function addNames(waiter) {
        const insertNames = await pool.query('insert into waiters (names) values ($1)', [waiter])
        return insertNames.rows;
    }

    async function getNames() {
        const theNames = await pool.query('select names from waiters')
        return theNames.rows;
    }

    async function getDays() {
        const theDays = await pool.query('select days from weekdays')
        return theDays.rows;
    }

    // async function insertIntoBhelekazi(){
    //     const daysId = await pool.query('select id from waiters where id = $1')
    //     const waiterId = await pool.query('select id from waiters where id = $1')
    //     return waiterId.rows;
    // }

    async function reset() {
        var del = await pool.query('delete from bhelekazi');
        return del;
    }

    return {
        addNames,
        reset,
        getNames,
        //selectedDays,
        getDays
    }
}