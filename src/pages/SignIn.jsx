import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "../components/OAuth";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [logedIn, setLogedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
        setLogedIn(true);
      }
    } catch (error) {
      toast.error("Wrong Credentials");
    }
  };

  if (!logedIn) {
    return (
      <div className="pageContainer align-items-center">
        <header>
          <p className="pageHeader signinHeader ">Wellcome Back!</p>
        </header>

        <form onSubmit={onSubmit} className="form_input align-items-center">
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              className="showPassword"
              src={visibilityIcon}
              alt="show password"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <div className="signInBar">
            <button className="btn-primary signInButton">Sign In</button>

            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>
          </div>
        </form>
        <OAuth />
        <Link to="/sign-up" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    );
  } else {
    toast.error("Already Loged in!");
    return <>{navigate("/")};</>;
  }
}

export default SignIn;
