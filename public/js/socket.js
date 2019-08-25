let socket = io()

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

let renderUI = (event, data) => {
  let div = document.createElement('div')
  div.setAttribute('class', 'payload')

  let eventTitle = document.createElement('h2')
  let eventAction = document.createElement('p')

  let titleTxt, actionTxt

  if (event === 'issue') {
    titleTxt = 'Issue'
    actionTxt = data.action
  }

  if (event === 'issue_comment') {
    titleTxt = 'Issue Comment'
    actionTxt = data.action
  }

  if (event === 'push') {
    titleTxt = 'Push'
    actionTxt = 'Pusher: ' + data.pusher.name
  }

  let title = document.createTextNode(titleTxt)
  let action = document.createTextNode(actionTxt)

  eventTitle.appendChild(title)
  eventAction.appendChild(action)

  div.appendChild(eventTitle)
  div.appendChild(eventAction)

  let htmlbody = document.getElementsByTagName("BODY")[0]
  htmlbody.prepend(div)
}