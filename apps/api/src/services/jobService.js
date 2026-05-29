const jobs = [];

export async function listJobs() {
  return jobs;
}

export async function createJob(payload) {
  const { id: _ignoredId, status: _ignoredStatus, ...safe } = payload;
  const job = { ...safe, id: `job_${Date.now()}`, status: "open" };
  jobs.push(job);
  return job;
}
