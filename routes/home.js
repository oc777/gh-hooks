'use strict'

const router = require('express').Router()
const fetch = require('node-fetch')

router.get('/', (req, res, next) => {
  getIssues()
    .then(issues => {
      const locals = {
        issues: issues.map(
          issue => ({
            url: issue.url,
            title: issue.title,
            state: issue.state
          }))
      }
      return locals
    }).then(locals => res.render('home/index', { locals }))

    .catch(err => console.error(err))
})

const getIssues = async () => {
  // const res = await fetch(`https://api.github.com/repos/1dv023/oc222ba-examination-3/issues?access_token=${process.env.GIT_AUTH}`)
  const res = await fetch('https://api.github.com/repos/1dv023/oc222ba-examination-3/issues', {
    headers: { Authorization: `token ${process.env.GIT_AUTH}` }
  })
  const json = await res.json()
  return json
}

module.exports = router
