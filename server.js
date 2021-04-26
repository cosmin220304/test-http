var http = require('http');

//RESTFULL
//C - create = POST
//R - read = GET
//U - update = PUT/PATCH
//D - delete = DELETE

let users = [
]

http.createServer((req, res) => {
  
  console.log(req.method, req.url)

  if (req.method === "GET" && req.url === "/users") {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.write(JSON.stringify(users))
    res.end()
  }
  else if (req.method === "POST" && req.url === "/users"){
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      let newUser = JSON.parse(body)
      newUser.id = users.length + 1
      users.push(newUser)

      res.writeHead(201, {
        'Content-Type': 'application/json'
      })
      res.end()
    })
  }
  else if (req.method == "PATCH" && req.url === "/users"){
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      const updatedUser = JSON.parse(body)
      
      for(let i = 0; i < users.length; i++) {
        console.log(users[i].id)
        console.log(updatedUser.id)
        if (users[i].id == updatedUser.id) {
          users[i] = updatedUser
        }
      }

      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end()
    })
  }
  else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    })
    res.write('not found')
    res.end()
  }

}).listen(process.env.PORT || 8080)