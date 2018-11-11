const http = require('http');
const users = [];

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
  res.write('<body>');
  res.write('<ul>')

  users.forEach(user => {
    res.write(`<li>${user}</li>`)
  });

  res.write('</ul');
  res.write('</body');
  res.write('</html>');
  res.end();
};

const createUser = (req, res) => {
  const newUser = [];

  const getData = chunk => newUser.push(chunk);
  req.on('data', getData)

  const onDataReady = () => {
    const parsedUser = Buffer.concat(newUser).toString();
    users.push(parsedUser.split('=')[1]);

    res.statusCode = 302;
    res.setHeader('Location', '/users');
    res.end();
  }

  req.on('end', onDataReady);
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