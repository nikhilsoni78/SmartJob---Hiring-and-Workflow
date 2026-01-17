const { StatusCodes } = require("http-status-codes");

const {
  createAppService,
  updateAppService,
  getAllAppService,
  getAppService,
} = require("../Service/ApplicationService");

const createApp = async (req, res) => {
  const application = await createAppService(req.params.id, req.user);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Application Submitted Successfully", data: application });
};

const getAllApp = async (req, res) => {
  const applications = await getAllAppService(req.user);
  res
    .status(StatusCodes.OK)
    .json({ count: applications.length, data: applications });
};

const getApp = async (req, res) => {
  const application = await getAppService(req.params.id, req.user);
  res.status(StatusCodes.OK).json({
    message: `application found with job id: ${req.params.id}`,
    data: application,
  });
};

const updateApp = async (req, res) => {
  const application = await updateAppService(req.body, req.params.id, req.user);
  res
    .status(StatusCodes.OK)
    .json({ message: "Update Successfully", data: application });
};

module.exports = {
  createApp,
  updateApp,
  getAllApp,
  getApp,
};
