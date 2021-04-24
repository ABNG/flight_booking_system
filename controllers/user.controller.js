const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const myCustomLabels = {
    totalDocs: 'totalPages',
    docs: 'results',
  };
  var query = {};
  var options = {
    // pagination: false, //show all results
    // select: 'title date author',
    // sort: req.query.sortBy==null ? { name: -1 } : {req.query.sortBy: 1},
    // populate: 'clinic_id',
    // lean: true,  //make query faster
    page: req.query.page==null ? 1 : req.query.page,
    limit: req.query.limit==null ? 10 : req.query.limit,
    customLabels: myCustomLabels,
  };
  const result = await userService.queryUsers(query, options);
  res.send(result);  //to get user id from token   req.user.id
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
