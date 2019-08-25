let socket = io()

socket.on('issue', (data) => {
  console.log('CLIENT issue')
  console.log(data)
})



socket.on('push', (data) => {
  console.log('CLIENT push')
  console.log(data)
})