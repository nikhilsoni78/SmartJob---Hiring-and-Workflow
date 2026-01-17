const Job = require("../Models/Job");
const {
  BadRequestError,
  UnauthorizedError,
  NotfoundError,
  ForbiddenError,
} = require("../Errors");

const createJobService = async (body, user) => {
  const { title, description } = body;
  if (!title || !description) {
    throw new BadRequestError("Title and Description is required");
  }
 
  const job = await Job.create({ title, description, postedBy: user.userId });
  return job;
};

const getJobService = async (id, user) => {
  const job = await Job.findOne({ _id: id, postedBy: user.userId });
  if (!job) {
    throw new NotfoundError(`No job found with id: ${id}`);
  }
  return job;
};

const getAllJobService = async (user) => {
  const jobs = await Job.find({ postedBy: user.userId }).sort("createdAt");
  if (jobs.length === 0) {
    throw new NotfoundError("No Jobs Available");
  }
  return jobs;
};

const updateJobService = async (body, user, id) => {
  const { title, description } = body;
  if (!title && !description) {
    throw new BadRequestError(
      "At least one field (title or description) is required"
    );
  }
  const job = await Job.findOneAndUpdate(
    { _id: id, postedBy: user.userId , status:"OPEN"},
    { title, description },
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotfoundError(`No job found with ${id}`);
  }
  return job;
};

const deleteJobService = async (user, id) => {
  const job = await Job.findOneAndDelete({ _id: id, postedBy: user.userId });

  if (!job) {
    throw new NotfoundError(`No job found with ${id}`);
  }
  return job;
};

module.exports = {
  createJobService,
  getJobService,
  getAllJobService,
  updateJobService,
  deleteJobService,
};
