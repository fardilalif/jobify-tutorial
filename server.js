import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";
const app = express();
dotenv.config();

let jobs = [
  { id: nanoid(), company: "apple", position: "frontend" },
  { id: nanoid(), company: "google", position: "backend" },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => res.send("hello world"));
// get all jobs
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

// create job
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return res
      .status(400)
      .json({ msg: "please provide values for company and position" });
  }

  const job = { id: nanoid(10), company, position };
  jobs.push(job);
  res.status(201).json({ job });
});

// get single job
app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);
  if (!job) return res.status(404).json({ msg: `no job with id: ${id}` });

  res.status(200).json({ job });
});

// edit job
app.patch("/api/v1/jobs/:id", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position)
    return res
      .status(400)
      .json({ msg: "please provide values for company and position" });

  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) return res.status(404).json({ msg: `no job with id: ${id}` });

  job.company = company;
  job.position = position;

  res.status(200).json({ msg: "job modified", job });
});

// delete job
app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) return res.status(404).json({ msg: `no job with id: ${id}` });

  const newJobs = jobs.filter(job => job.id !== id)
  jobs = newJobs;

  res.status(200).json({ msg: "job deleted" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
