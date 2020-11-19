module.exports = function waiterFactory(pool) {

    async function getDays() {
        const theDays = await pool.query('select days from weekdays')
        console.log(theDays.rows);
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

    async function getTheShifts(shifts, names) {
        const waiterName = await pool.query('select id from waiters where names = $1', [names])
        const waiterId = waiterName.rows[0].id
        // console.log(wa)
        for (let i = 0; i < shifts.length; i++) {
            //  console.log(shifts[i]);
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
        var getDaysOnly = await getDays()
        // console.log(selectedShift);

        const arrayForShifts = [{
            id: 0,
            day: 'Monday',
            Waiter: [],
            color: ''
        }, {
            id: 1,
            day: 'Tuesday',
            Waiter: [],
            color: ''
        }, {
            id: 2,
            day: 'Wednesday',
            Waiter: [],
            color: ''
        }, {
            id: 3,
            day: 'Thursday',
            Waiter: [],
            color: ''
        }, {
            id: 4,
            day: 'Friday',
            Waiter: [],
            color: ''
        }, {
            id: 5,
            day: 'Saturday',
            Waiter: [],
            color: ''
        }, {
            id: 6,
            day: 'Sunday',
            Waiter: [],
            color: ''
        }]

        if (selectedShift.length > 0) {
            for (let i = 0; i < selectedShift.length; i++) {
                arrayForShifts.forEach(element => {
                    if (element.day === selectedShift[i].days) {
                        element.Waiter.push(selectedShift[i].names)
                    }
                    if (element.Waiter.length <= 2) {
                        element.color = "orange";
                    }
                    if (element.Waiter.length === 3) {
                        element.color = "green";
                    }
                    if (element.Waiter.length > 3) {
                        element.color = "red";
                    }
                })
            }
        }
        return arrayForShifts;
    }

    async function getDaysForEachPerson(waiterDays) {
        // const theDays = await pool.query('select days from weekdays where days = $1', [waiterDays])
        const all = await getDays();
        var daysOnly = await pool.query('select days from bhelekazi JOIN waiters on bhelekazi.waiters_id = waiters.id JOIN weekdays on bhelekazi.weekdays_id = weekdays.id where names = $1', [waiterDays])
        //console.log(daysOnly);
        var rowDaysOnly = daysOnly.rows;
        // console.log(all);
        for (const allDays of all) {
            console.log(allDays + 'days');
            for (const dayForOne of rowDaysOnly) {
                console.log(dayForOne + 'jnj');
                if (allDays ) {

                }
            }
        }
    }

    async function reset() {
        var del = await pool.query('delete from bhelekazi');
        return del;
    }

    return {
        addNames,
        reset,
        getNames,
        getTheShifts,
        displayAdmin,
        getDaysForEachPerson,
        getDays,
        eachDay
    }
}