import React, { useState } from "react";
import { loginCustomer } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../redux-setup/reducers/auth";

const Login = () => {
  const [inputValue, setInputValue] = useState({});
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const valueForm = (e) => {
    const { name, value } = e.target;
    return setInputValue({ ...inputValue, [name]: value });
  };

  const clickLogin = () => {
    loginCustomer(inputValue)
      .then(({ data }) => {
        dispatch(loggedIn(data));
        return navigate("/");
      })
      .catch((error) => {
        if (error.response.data === "email not valid") {
          return setAlert("Email không tồn tại");
        }
        if (error.response.data === "password not valid") {
          return setAlert("Password không tồn tại");
        }
      });
  };
  return (
    <>
      <div id="customer">
        {alert && <div className="alert alert-danger text-center">{alert}</div>}
        <h3 className="text-center">Đăng nhập</h3>
        <form method="post">
          <div className="row">
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={valueForm}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={valueForm}
                placeholder="Mật khẩu (bắt buộc)"
                type="text"
                name="password"
                className="form-control"
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div
            onClick={clickLogin}
            className="by-now col-lg-6 col-md-6 col-sm-12"
          >
            <Link to="#">
              <b>Đăng nhập ngay</b>
            </Link>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="#">
              <b>Quay về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
