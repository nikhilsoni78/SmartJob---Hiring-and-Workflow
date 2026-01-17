const User = require("../Models/User");
const {
  BadRequestError,
  UnauthorizedError,
  NotfoundError,
} = require("../Errors");

const registerService = async (body) => {
  const { email, password } = body;
  if (!email || !password) {
    throw new BadRequestError("Email and password are Required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("User Already Exists");
  }

  const user = await User.create({ email, password });
  return user;
};

const loginService = async (body) => {
  const { email, password } = body;
  if (!email || !password) {
    throw new BadRequestError("Email and password are Required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthorizedError("Invalid Credentials");
  }
  const checked = await user.checkPass(password);
  if (!checked) {
    throw new UnauthorizedError("Invalid Credentials");
  }
  return user;
};

const changeRoleService = async (body, userId) => {
  const { role } = body;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { role: role },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new NotfoundError(`User not found with id: ${userId}`);
  }
  return user;
};

const getAllUser = async() => {
  const users = await User.find({});
  if (users.length === 0) {
    throw new NotfoundError("No user exists");
  }
  return users;
}

const changeAccStatus = async (body, userId) => {
  const { isActive } = body;
  const user = await User.findOneAndUpdate({ _id: userId }, { isActive: isActive }, { new: true, runValidators: true });
  return user;
}

module.exports = {
  registerService,
  loginService,
  changeRoleService,
  getAllUser,
  changeAccStatus,
};
