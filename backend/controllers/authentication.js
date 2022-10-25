const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    console.log('I am in HERE!')
    let user = await User.findOne({
        where: { email: req.body.email }
    })
    console.log(user)

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({
            message: `To be really honest with you, I can not find your username and password! Try Again?`
        })
    } else {
        res.json({ user })
    }
})

module.exports = router