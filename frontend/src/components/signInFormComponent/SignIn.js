import React, { useState } from "react";
import "./SignIn.css";
import img from "../../assets/ImageResources/imgClassmates.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../Loading/Loading";
import ForgotPassword from "./ForgotPassword";

const SignInCom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      if (data.role === "admin") {
        window.location.replace("/administrator");
      } else if (data.role === "student") {
        window.location.replace("/Student");
      } else if (data.role === "staff") {
        window.location.replace("/Teacher");
      }
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="create-account-main-div ">
        <section className="h-100 bg-dark bg-dark-col">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card card-registration my-4 shadow-lg p-3 mb-5 bg-white rounded set-border-radius">
                  <div className="row g-0">
                    <div className="col-xl-6 d-none d-xl-block">
                      <img
                        src={img}
                        alt="train"
                        className="train-img img-fluid"
                      />
                    </div>
                    <div className="col-xl-6 p-5">
                      <Link to="/">
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                        ></button>
                      </Link>
                      <div className="card-body p-md-5 text-black sub-form">
                        {error && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "20px",
                              paddingLeft: "100px",
                            }}
                          >
                            {error}
                          </p>
                        )}
                        <div className="logo-name shadow p-3 mb-5 bg-white rounded logo-name-sub">
                          <p className="sub-logo-name">Sign In Here</p>
                        </div>

                        <div className="acc-des text-uppercase text-center mb-5 acc-des-sub wel-statement">
                          Welcome To The UIS Family
                          <br />
                          {loading && <LoadingSpinner />}
                        </div>
                        <div className="form-outline mb-4 wel-statement">
                          <label
                            className="form-label"
                            htmlFor="form3Example97"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            id="form3Example97"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4 wel-statement">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cg"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form3Example4cg"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <ForgotPassword />
                        <div className="d-flex justify-content-end pt-3 wel-statement">
                          <button
                            type="submit"
                            className="btn  btn-lg ms-2 btn-login"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
};

export default SignInCom;
