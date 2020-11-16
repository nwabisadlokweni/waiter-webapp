module.exports = function waiterFactory(pool) {

    async function getDays() {
        const theDays = await pool.query('select days from weekdays')
        //console.log(theDays);
        return theDays.rows;
    }

    // async function getDaysId(day) {
    //     const daysId = await pool.query('select id from weekdays where days = $1', [day])
    //     for (i = 0; i < daysId.length; i++) {
    //         const weekday = daysId.rows[0].id  
    //         console.log(weekday);
    //        // return weekday.rows[0].id;
    //     }
    // }

    async function addNames(waiter) {
        const insertNames = await pool.query('insert into waiters (names) values ($1)', [waiter])
        return insertNames.rows;
    }

    // async function getWaitersId(waiterId){
    //     const waiterIds = await pool.query('select id from waiters where id = $1', [waiterId])
    //     const waiterName = waiterIds.rows[0].id
    //     console.log(waiterName);

    //     return waiterName.rows;
    // }

    async function getNames() {
        const theNames = await pool.query('select names from waiters')
        return theNames.rows;
    }

    // async function getTheShifts() {

    //     await pool.query('insert into bhelekazi (waiters_id, weekdays_id) values ($1, $2)')

    // }

    async function getTheShifts(shifts, names) {
        const waiterName = await pool.query('select id from waiters where names = $1', [names])
        const waiterId = waiterName.rows[0].id
        // console.log(wa)
        for (let i = 0; i < shifts.length; i++) {
          //  console.log(shifts[i]);
            // const waiter = waiterId
            const daysId = await pool.query('select id from weekdays where days = $1', [shifts[i]])
            const weekdays = daysId.rows[0].id
            //    const daysId = await getDaysId(weekdays)
           // console.log(weekdays)
            await pool.query('insert into bhelekazi (waiters_id, weekdays_id) values ($1, $2)', [waiterId, weekdays])
            //  return getShifts.rows
        }
    }

    async function displayAdmin() {
        const admin = await pool.query('select names,days from bhelekazi JOIN waiters on bhelekazi.waiters_id = waiters.id JOIN weekdays on bhelekazi.weekdays_id = weekdays.id;')
        return admin.rows;
    }

    async function eachDay() {
        let selectedShift = await displayAdmin();
        const arrayForShifts = [{
            id: 0,
            day: 'Monday',
            Waiter: []
        }, {
            id: 1,
            day: 'Tuesday',
            Waiter: []
        }, {
            id: 2,
            day: 'Wednesday',
            Waiter: []
        }, {
            id: 3,
            day: 'Thursday',
            Waiter: []
        }, {
            id: 4,
            day: 'Friday',
            Waiter: []
        }, {
            id: 5,
            day: 'Saturday',
            Waiter: []
        }, {
            id: 6,
            day: 'Sunday',
            Waiter: []
        }]

        if (selectedShift.length > 0) {
            for (let i = 0; i < selectedShift.length; i++) {
                arrayForShifts.forEach(element => {
                    if (element.day === selectedShift[i].days) {
                        element.Waiter.push(selectedShift[i].waiters)
                    }
                    if (element.Waiter.length === 2) {
                        element.colour = "orange";
                    }
                    if (element.Waiter.length === 3) {
                        element.colour = "green";
                    }
                    if (element.Waiter.length === 4) {
                        element.colour = "red";
                    }
                })
            }
        }
        return arrayForShifts;
    }

    async function reset() {
        var clear = await pool.query('delete from bhelekazi');
        //var del = await pool.query('delete from waiters');
        return clear;
    }

    return {
        addNames,
        reset,
        getNames,
        //getDaysId,
        getTheShifts,
        //getWaitersId,
        displayAdmin,
        getDays,
        eachDay
    }
}