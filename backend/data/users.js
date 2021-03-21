import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Mimi',
    email: 'mimi@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Xiejei',
    email: 'xiejei@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Bonbon',
    email: 'bonbon@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
