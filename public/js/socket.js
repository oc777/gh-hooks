let socket = io()

socket.on('issue', (data) => {
  console.log('CLIENT issue')
  console.log(data)
  renderUI(data)
})
socket.on('issue_comment', (data) => {
  console.log('CLIENT issue_comment')
  console.log(data)
  renderUI(data)
})
socket.on('push', (data) => {
  console.log('CLIENT push')
  console.log(data)
  renderUI(data)
})

let renderUI = (data) => {
  let div = document.createElement('div')
  div.setAttribute('class', 'payload')

  let eventTitle = document.createElement('h2')
  let eventAction = document.createElement('p')
  let eventBody = document.createElement('p')

  let titleTxt = (data.action) ? ((data.action.comment) ? 'Issue Comment' : 'Issue') : 'Push Notification'
  let title = document.createTextNode(titleTxt)

  let actionTxt = data.action || ('Pusher: ' + data.pusher.name)
  let action = document.createTextNode(actionTxt)

  let bodyTxt = (data.issue) ? ((data.label.name) ? data.label.name : data.issue.body ) : ''
  let body = document.createTextNode(bodyTxt)

  eventTitle.appendChild(title)
  eventAction.appendChild(action)
  eventBody.appendChild(body)

  div.appendChild(eventTitle)
  div.appendChild(eventAction)
  div.appendChild(eventBody)

  let htmlbody = document.getElementsByTagName("BODY")[0]
  htmlbody.appendChild(div)
}