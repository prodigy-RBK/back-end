const faker = require("faker");

const generateUsers = () => {
  const users = [];
  for (let i = 0; i < 20; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();

    users.push({
      first_name: firstName,
      last_name: lastName,
      email: email
    });
  }
  return users;
};

const generateProducts = () => {
  const users = [];
  for (let i = 0; i < 20; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();

    users.push({
      first_name: firstName,
      last_name: lastName,
      email: email
    });
  }
  return users;
};
