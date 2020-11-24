module.exports = function waiterFactory(pool) {

    async function getDays() {
        const theDays = await pool.query('select days from weekdays')
        return theDays.rows;
    }

    async function addNames(waiter) {
        const insertNames = await pool.query('insert into waiters (names) values ($1)', [waiter])
        return insertNames.rows;
    }

    async function getNames() {
        const theNames = await pool.query('select names from waiters')
        return theNames.rows;
    }

    async function getTheShifts(shifts, names) {
        const waiterName = await pool.query('select id from waiters where names = $1', [names])
        const waiterId = waiterName.rows[0].id
        await pool.query('delete from bhelekazi where waiters_id = $1', [waiterId]);
        for (let i = 0; i < shifts.length; i++) {
            const daysId = await pool.query('select id from weekdays where days = $1', [shifts[i]])
            const weekdays = daysId.rows[0].id
            await pool.query('insert into bhelekazi (waiters_id, weekdays_id) values ($1, $2)', [waiterId, weekdays])
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

    async function dayId(day) {
        const day_id = await pool.query('select days from bhelekazi JOIN waiters on bhelekazi.waiters_id = waiters.id JOIN weekdays on bhelekazi.weekdays_id = weekdays.id where names = $1', [day]);
        return day_id.rows;
    }

    async function waiterIds(join_waiterId) {
        const waiterId = await pool.query('select id from waiters where names = $1', [join_waiterId])
        return waiterId.rows;
    }

    async function getDaysForEachPerson(names) {
        const theDays = await pool.query('select days from weekdays');
        const waiterId = await waiterIds(names);
        var daysOnly = await dayId(names)
        var rowDaysOnly = theDays.rows;
        rowDaysOnly.forEach(async (day) => {
            day.checked = '';
            daysOnly.forEach(async (names) => {
                if (day.days === names.days) {
                    day.checked = 'checked';
                }
            })
        })
        return rowDaysOnly;
    }

    async function reset() {
        var del = await pool.query('delete from bhelekazi; delete from waiters');
        return del.rows;
    }

    return {
        addNames,
        reset,
        getNames,
        getTheShifts,
        displayAdmin,
        waiterIds,
        dayId,
        getDaysForEachPerson,
        getDays,
        eachDay
    }
}