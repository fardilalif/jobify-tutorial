import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.js";
import Wrapper from "./../assets/wrappers/StatsContainer";
import { StatItem } from "./../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/admin/app-stats");
    return data;
  } catch (error) {
    toast.success("You are not authorized to view this pages");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title="current user"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};
export default Admin;
