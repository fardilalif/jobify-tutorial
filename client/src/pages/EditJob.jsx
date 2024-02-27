import { useQuery } from "@tanstack/react-query";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants.js";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import { FormRow, FormRowSelect, SubmitBtn } from "./../components";
import customFetch from "./../utils/customFetch";

const editJobQuery = (params) => {
  return {
    queryKey: ["job", params.id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${params.id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(editJobQuery(params));
      return { params };
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-jobs");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job edited successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditJob = () => {
  const { params } = useLoaderData();
  const { data } = useQuery(editJobQuery(params));
  const { job } = data;

  return (
    <Wrapper>
      <Form method="POST" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
