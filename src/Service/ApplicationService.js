const Application = require("../Models/Application");
const Job = require("../Models/Job");
const { BadRequestError, NotfoundError, ForbiddenError } = require("../Errors");

const createAppService = async (jobId, user) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new NotfoundError(`No jobs are Available with this Id: ${jobId}`);
  }
  if (job.status !== "OPEN") {
    throw new BadRequestError("Sorry..!! The job is closed..");
  }
  const existing = await Application.findOne({
    job: jobId,
    candidate: user.userId,
  });
  if (existing) {
    throw new BadRequestError("You can apply once for a job");
  }
  const application = await Application.create({
    job: jobId,
    candidate: user.userId,
  });
  return application;
};

const getAllAppService = async (user) => {
  const applications = await Application.find({ candidate: user.userId });
  if (applications.length === 0) {
    throw new NotfoundError("No Applications");
  }
  return applications;
};

const getAppService = async (jobId, user) => {
  const application = await Application.findOne({
    job: jobId,
    candidate: user.userId,
  }).populate("candidate job");
  if (!application) {
    throw new NotfoundError(`No Application Found with job id: ${jobId}`);
  }
  return application;
};

const updateAppService = async (body, appId, user) => {
  const { status } = body;

  const application = await Application.findById(appId).populate("job");
  if (!application) {
    throw new NotfoundError(
      `No application found with application id: ${appId}`
    );
  }
  if (application.job.postedBy.toString() !== user.userId) {
    throw new ForbiddenError(
      "You are not authorized to update this application"
    );
  }
  const currentStatus = application.status;

  if (["HIRED", "REJECTED"].includes(currentStatus)) {
    throw new ForbiddenError(
      `Application already ${currentStatus}, cannot update further`
    );
  }
  const statusFlow = {
    APPLIED: ["SHORTLISTED"],
    SHORTLISTED: ["INTERVIEW", "REJECTED"],
    INTERVIEW: ["HIRED", "REJECTED"],
  };
  
  const allowedNextStatuses = statusFlow[currentStatus];
  if (!allowedNextStatuses.includes(status)) {
    throw new BadRequestError(
      `Invalid status transition from ${currentStatus} to ${status}`
    );
  }

  const allowedStatusFlow = statusFlow[currentStatus];

  if (!allowedStatusFlow.includes(status)) {
    throw new BadRequestError("You can not go against the hiring process");
  }

  application.status = status;
  await application.save();

  return application;
};


module.exports = {
  createAppService,
  updateAppService,
  getAllAppService,
  getAppService,
};
