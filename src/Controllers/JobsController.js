const Job = require("../Models/Job");
const { StatusCodes } = require("http-status-codes");
const {
  createJobService,
  getJobService,
  getAllJobService,
  updateJobService,
  deleteJobService,
} = require("../Service/JobService");

const createJob = async (req, res) => {
  const job = await createJobService(req.body, req.user);
  res.status(StatusCodes.CREATED).json({ message: "Job Created", data: job });
};

const getJob = async (req, res) => {
  const job = await getJobService(req.params.id, req.user);
  res
    .status(StatusCodes.OK)
    .json({ message: `Job found with id ${req.params.id}`, data: job });
};

const getAllJob = async (req, res) => {
  const jobs = await getAllJobService(req.user);
  res.status(StatusCodes.OK).json({ count: jobs.length, data: jobs });
};

const updateJob = async (req, res) => {
  const job = await updateJobService(req.body, req.user, req.params.id);

  res
    .status(StatusCodes.OK)
    .json({ message: `id: ${req.params.id} Updated SuccessFully`, data: job });
};

const deleteJob = async (req, res) => {
  const job = await deleteJobService(req.user, req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ message: `id: ${req.params.id} Deleted SuccessFully`, data: job });
};

module.exports = {
  createJob,
  getJob,
  getAllJob,
  updateJob,
  deleteJob,
};
