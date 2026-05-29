import test from "node:test";
import assert from "node:assert/strict";
import { createJob } from "../services/jobService.js";

test("createJob ignores caller-supplied id", async () => {
  const job = await createJob({ id: "attacker_id", title: "Build API" });
  assert.notEqual(job.id, "attacker_id");
  assert.ok(job.id.startsWith("job_"));
  assert.equal(job.title, "Build API");
});

test("createJob ignores caller-supplied status", async () => {
  const job = await createJob({ title: "Build API", status: "COMPLETED" });
  assert.equal(job.status, "open");
  assert.equal(job.title, "Build API");
});

test("createJob preserves server-owned id and status", async () => {
  const job = await createJob({ title: "Build API", description: "Build the API", budgetMin: 100 });
  assert.ok(job.id.startsWith("job_"));
  assert.equal(job.status, "open");
  assert.equal(job.title, "Build API");
  assert.equal(job.description, "Build the API");
  assert.equal(job.budgetMin, 100);
});
