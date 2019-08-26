'use strict'

const router = require('express').Router()
const fetch = require('node-fetch')

router.get('/', (req, res, next) => {
  getIssues()
  .then(data => console.log(data))

  res.render('home/index')
})

let getIssues = async () => {
    let res = await fetch(`https://api.github.com/repos/1dv023/oc222ba-examination-3/issues?access_token=${process.env.GIT_AUTH}`)
    let json = await res.json()
    return json
}

module.exports = router
