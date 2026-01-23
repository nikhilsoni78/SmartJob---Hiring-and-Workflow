const { NotfoundError } = require("../Errors");
const {
  changeRoleService,
  getAllUser,
  changeAccStatus,
  changePassword,
  logoutService,
} = require("../Service/UserService");
const { StatusCodes } = require("http-status-codes");

const logout = async (req, res) => {
  const user = await logoutService( req.user);
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: true
  })

  res.status(StatusCodes.OK).json({
    success: true,
    message: `User ${req.user.userId} logut SuccessFully`,
    data: user,
  });
};

const changeRole = async (req, res) => {
  const user = await changeRoleService(req.body, req.params.id);
  res.status(StatusCodes.OK).json({ message: `role updated`, data: user });
};

const getAll = async (req, res) => {
  const users = await getAllUser();
  res.status(StatusCodes.OK).json({ count: users.length, data: users });
};

const changeStatus = async (req, res) => {
  const user = await changeAccStatus(req.body, req.params.id);
  res.status(StatusCodes.OK).json({
    message: `Account Status changed to ${user.isActive}`,
    data: user,
  });
};

const changePasswordController = async (req, res) => {
  const user = await changePassword(req.body, req.user);
  res.status(StatusCodes.OK).json({ success: true, data: user });
};

module.exports = {
  changeRole,
  getAll,
  changeStatus,
  changePasswordController,
  logout,
};
