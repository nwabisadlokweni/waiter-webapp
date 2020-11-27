module.exports = function waiterRoutes(waiter) {
    const _ = require("lodash");

    async function index(req, res) {

        res.render('index')
    }

    async function step(req, res) {

        res.render('instructions')

    }

    async function getWaiters(req, res) {
        const username1 = _.capitalize(req.params.username);
        const checked = await waiter.getDaysForEachPerson(username1);
        const allDays = await waiter.getDays();

        res.render('waiters', {
            username: username1,
            allDays: checked,
            checked
        });
    }

    async function inserting(req, res) {
        const username1 = _.capitalize(req.params.username);
        const week = req.body.day;
      
        try {
            if (week !== '') {
                req.flash('success', `successful`);
            }
            const showWaiters = await waiter.displayAdmin()
            await waiter.addNames(username1)
            const both = await waiter.getTheShifts(username1,week)
            const allDays = await waiter.getDays()
            const checked = await waiter.getDaysForEachPerson(username1)

            res.render('waiters', {
                username: username1,
                both,
                allDays: checked,
                checked,
                showWaiters
            })
        }
        catch (error) {

        }
    }


    async function displaying(req, res) {
        const display = await waiter.eachDay()
        const showWaiters = await waiter.displayAdmin()

        res.render('administrator', {
            showWaiters,
            display
        })
    }

    async function reseting(req, res) {

        req.flash('resetSucceded', `You have successfully cleared your shift's table`);
        await waiter.reset()
        const display = await waiter.eachDay()

        res.render('administrator', {
            display
        })
    }

    return {
        index,
        step,
        getWaiters,
        inserting,
        waiter,
        displaying,
        reseting
    }

}