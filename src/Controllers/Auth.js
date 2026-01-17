const { StatusCodes } = require("http-status-codes");
const {
  registerService,
  loginService,
} = require("../Service/UserService");

//register
const register = async (req, res) => {
  const user = await registerService(req.body);
  const token = await user.createJwt();
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
  const token = await user.createJwt();
  res
    .status(StatusCodes.OK)
    .json({ Message: "Login SuccessFully", Token: token });
};


module.exports = { register, login };
