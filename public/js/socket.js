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
  let eventTitle = document.createElement('h2')
  let eventAction = document.createElement('p')
  let eventBody = document.createElement('p')

  let title = document.createTextNode('New ' + event)
  let action = document.createTextNode(data.action)
  let body = document.createTextNode(data.issue.body)

  eventTitle.appendChild(title)
  eventAction.appendChild(action)
  eventBody.appendChild(body)

  div.appendChild(eventTitle)
  div.appendChild(eventAction)
  div.appendChild(eventBody)

  let htmlbody = document.getElementsByTagName("BODY")[0]
  htmlbody.appendChild(div)
}