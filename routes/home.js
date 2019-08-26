'use strict'

const router = require('express').Router()
const fetch = require('node-fetch')

router.get('/', (req, res, next) => {
  let gitissues
  getIssues()
    .then(issues => gitissues = issues)
    .catch(err => console.error(err))

  const locals = {
    issues: gitissues.map(
      issue => ({
        url: issue.url,
        title: issue.title,
        state: issue.state
      }))
  }

  res.render('home/index', { locals })
})

const getIssues = async () => {
  const res = await fetch(`https://api.github.com/repos/1dv023/oc222ba-examination-3/issues?access_token=${process.env.GIT_AUTH}`)
  const json = await res.json()
  return json
}

module.exports = router
