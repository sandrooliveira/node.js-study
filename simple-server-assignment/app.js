const http = require('http');

const showHome = res => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Create User</title></head>');
  res.write('<body><form action="/createUser" method="POST"><input type="text" name="user"><button type="submit">Create User</button></form></body>');
  res.write('</html>');
  res.end();
};

const listUsers = res => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Users</title></head>');
  res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
  res.write('</html>');
  res.end();
};

const createUser = (req, res) => {
  //Creation of the user is comming :)
  res.statusCode = 302;
  res.setHeader('Location', '/users');
  res.end();
}

const handleServerRequest = (req, res) => {
  if (req.url === '/') {
    return showHome(res);
  }

  if (req.url === '/users') {
    listUsers(res);
  }

  if (req.url === '/createUser' && req.method === 'POST') {
    createUser(req, res);
  }
}

const server = http.createServer(handleServerRequest);

server.listen(3000);