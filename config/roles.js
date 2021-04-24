const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getFilterFlights','bookAFlight']);
roleRights.set(roles[1], ['getUsers', 'manageUsers','addFlights','getFlights','changeStatus']);

module.exports = {
  roles,
  roleRights,
};
