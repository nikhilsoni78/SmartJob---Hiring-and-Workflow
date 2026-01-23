const User = require("../Models/User");

const {
  BadRequestError,
  UnauthorizedError,
  NotfoundError,
} = require("../Errors");

const jwt = require("jsonwebtoken");

const refreshTokenService = async (cookie) => {
  //extract token
  const token = cookie.refreshToken;
  if (!token) {
    throw new UnauthorizedError("No Refresh token found");
  }
  //decoding token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    //finding user
  } catch (error) {
    throw new UnauthorizedError("Issue in decoding token");
  }
  const user = await User.findById(decodedToken.userId);
  if (!user || token !== user.refreshToken) {
    throw new UnauthorizedError("Token Mismatched in DB");
  }
  //generating new tokens
  const accessToken = await user.createAccessToken();
  const refreshToken = await user.createRefreshToken();

  //saving new token to db
  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

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

const logoutService = async(user) =>{
  const fetchedUser = await User.findById(user.userId);
  if (!fetchedUser) {
    throw new NotfoundError(`No user found with id: ${user.userId}`);
  }
  fetchedUser.refreshToken = null;
  await fetchedUser.save();
  return fetchedUser;
}

const changeRoleService = async (body, userId) => {
  const { role } = body;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { role: role },
    { new: true, runValidators: true },
  );
  if (!user) {
    throw new NotfoundError(`User not found with id: ${userId}`);
  }
  return user;
};

const getAllUser = async () => {
  const users = await User.find({});
  if (users.length === 0) {
    throw new NotfoundError("No user exists");
  }
  return users;
};

const changeAccStatus = async (body, userId) => {
  const { isActive } = body;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { isActive: isActive },
    { new: true, runValidators: true },
  );
  return user;
};

const changePassword = async (body, user) => {
  const { newPassword } = body;
  if (!newPassword) {
    throw new BadRequestError("Password is mandatory");
  }
  const dbUser = await User.findOneAndUpdate(
    { _id: user.userId },
    { password: newPassword },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!dbUser) {
    throw new NotfoundError(`User not found with id: ${user.userId}`);
  }
  return dbUser;
};

module.exports = {
  registerService,
  loginService,
  changeRoleService,
  getAllUser,
  changeAccStatus,
  refreshTokenService,
  changePassword,
  logoutService,
};
