module.exports = function waiterFactory(pool) {

    async function addNames(waiter) {
        const insertNames = await pool.query('insert into waiters (names) values ($1)', [waiter])
        return insertNames.rows;
    }

    async function getNames() {
        const theNames = await pool.query('select names from waiters')
        return theNames.rows;
    }

    // async function getWaiterId(waiter) {
 
    //     return waiterId.rows;
    // }

    async function getDays() {
        const theDays = await pool.query('select days from weekdays')
        return theDays.rows;
    }

    // async function getDayForEach(name) {
    //  const 

    // } 

    async function getTheShifts(shifts, names) {
        const waiterName = await pool.query('select id from waiters where names = $1', [names])
        var waiterId = waiterName.rows[0].id
        console.log(waiterId)
        for (i = 0; i < shifts.length; i++) {    
            //console.log(shifts[i]);
            
        const daysId = await pool.query('select id from weekdays where days = $1', [shifts[i]])
        
        const weekdays = daysId.rows[0].id
        
        //    const daysId = await getDaysId(weekdays)

           console.log(weekdays)
           await pool.query('insert into bhelekazi (waiters_id, weekdays_id) values ($1, $2)', [waiterId, weekdays])
          //  return getShifts.rows
        }
    }


    async function reset() {
        //  var del = await pool.query('delete from bhelekazi');
        return del;
    }

    return {
        addNames,
        reset,
        getNames,
        // getWaiterId,
        getTheShifts,
       // getDayForEach,
        getDays
    }
}