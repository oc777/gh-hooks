'use strict'

const router = require('express').Router()
const https = require('https')

router.get('/', (req, res, next) => {
  https.get(`https://api.github.com/repos/1dv023/oc222ba-examination-3/issues?access_token=${process.env.GIT_AUTH}`, (resp) => {
    let issues = []

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      issues += chunk
    })

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(issues))
    })
  }).on('error', (err) => {
    console.log('Error: ' + err.message)
  })

  res.render('home/index')
})

module.exports = router
