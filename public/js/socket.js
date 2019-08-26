const socket = io()

// render UI when events are pushed from the server
socket.on('issue', (data) => {
  console.log('CLIENT issue')
  console.log(data)
  renderUI('issue', data)
})
socket.on('issue_comment', (data) => {
  console.log('CLIENT issue_comment')
  console.log(data)
  renderUI('issue_comment', data)
})
socket.on('push', (data) => {
  console.log('CLIENT push')
  console.log(data)
  renderUI('push', data)
})

// DOM rendering
const renderUI = (event, data) => {
  const div = document.createElement('div')

  const eventHeading = document.createElement('h2')
  const eventAction = document.createElement('p')
  const eventTitle = document.createElement('p')

  let titleTxt, actionTxt, headingTxt

  if (event === 'issue') {
    headingTxt = 'Issue'
    actionTxt = data.action
    titleTxt = data.issue.title
  }

  if (event === 'issue_comment') {
    headingTxt = 'Issue Comment'
    actionTxt = data.action
    titleTxt = data.issue.title
  }

  if (event === 'push') {
    headingTxt = 'Push'
    actionTxt = 'Pusher: ' + data.pusher.name
    titleTxt = ''
  }

  const heading = document.createTextNode(headingTxt)
  const title = document.createTextNode(titleTxt)
  const action = document.createTextNode(actionTxt)

  eventHeading.appendChild(heading)
  eventAction.appendChild(action)
  eventTitle.appendChild(title)

  div.appendChild(eventHeading)
  div.appendChild(eventAction)
  div.appendChild(eventTitle)

  const parent = document.getElementsByClassName('payload')[0]
  parent.prepend(div)
}
