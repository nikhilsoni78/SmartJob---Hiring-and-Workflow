const { StatusCodes } = require("http-status-codes");
const {
  registerService,
  loginService,
  refreshTokenService,
} = require("../Service/UserService");

//register
const register = async (req, res) => {
  const user = await registerService(req.body);
  const token = await user.createAccessToken();
  res.status(StatusCodes.CREATED).json({
    message: "User Created",
    data: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    token: token,
  });
};

//login
const login = async (req, res) => {
  const user = await loginService(req.body);
  const accessToken = await user.createAccessToken();
  const refreshToken = await user.createRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res
    .status(StatusCodes.OK)
    .json({ Message: "Login SuccessFully", Token: accessToken });
};

const refreshTokenAuth = async (req, res) => {
  const { accessToken, refreshToken } = await refreshTokenService(req.cookies);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({ success: true, Token: accessToken });
};

module.exports = { register, login, refreshTokenAuth };
