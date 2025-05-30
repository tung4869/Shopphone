import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerCustomer } from "../../services/Api";

const Register = () => {
  const [inputvalue, setInputValue] = useState({});
  const [status, SetSatus] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const inputForm = (e) => {
    const { name, value } = e.target;
    return setInputValue({ ...inputvalue, [name]: value });
  };

  const clickRegister = () => {
    registerCustomer(inputvalue)
      .then(() => {
        setErrorAlert("Đăng ký thành công!");
        SetSatus(!status);
        setInputValue({});
      })
      .catch((error) => {
        if (error.response.data === "email exists") {
          return setErrorAlert("Email đã tồn tại!");
        }
        if (error.response.data === "phone exists") {
          return setErrorAlert("Số điện thoại đã tồn tại!");
        }
        console.log(error);
      });
  };

  return (
    <>
      <div id="customer">
        {errorAlert && (
          <div
            className={`alert ${
              status ? "alert-success" : "alert-danger"
            } text-center`}
          >
            {errorAlert}
          </div>
        )}
        <h3 className="text-center">Đăng ký</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={inputForm}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                required
                value={inputvalue.fullName || ""}
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={inputForm}
                placeholder="Mật khẩu (bắt buộc)"
                type="text"
                name="password"
                className="form-control"
                required
                value={inputvalue.password || ""}
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={inputForm}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
                value={inputvalue.email || ""}
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={inputForm}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                required
                value={inputvalue.phone || ""}
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={inputForm}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                required
                value={inputvalue.address || ""}
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div
            onClick={clickRegister}
            className="by-now col-lg-6 col-md-6 col-sm-12"
          >
            <Link to="#">
              <b>Đăng ký ngay</b>
            </Link>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="/">
              <b>Quay về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
