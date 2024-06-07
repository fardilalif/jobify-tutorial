import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import { Logo } from "../components";
import Wrapper from "./../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
            expedita fugiat commodi illum quos velit nihil repellat
            reprehenderit, odit, quam dolorem. Enim dolorem natus itaque.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
