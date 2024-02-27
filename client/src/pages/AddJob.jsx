import { Form, redirect, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch.js";
import { JOB_STATUS, JOB_TYPE } from "./../../../utils/constants";
import Wrapper from "./../assets/wrappers/DashboardFormPage";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/jobs", data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job added successfully");
      return redirect("all-jobs");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="POST" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
