import React, { useContext } from "react";
import { Form, message as messager } from "antd";
import { useDispatch} from "react-redux";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { loginUser } from "../features/userSlice";
import "../style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const { setAuthenticated ,setToggle} = useContext(AuthContext);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    // console.log("Success:", values);
    const response = await dispatch(loginUser(values));
    if (response.payload.statusCode === 200) {
      setAuthenticated(true);
      messager.success(response.payload.message, 3);
    } else {
      messager.error(response.payload.message, 3);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="Login-div">
      <Form
        name="basic"
        labelCol={{
          span: 30,
        }}
        wrapperCol={{
          span: 60,
        }}
        style={{
          width: 500,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="Form"
      >
        <h1 style={{ display: "flex", justifyContent: "center" }}>Login</h1>
        <Input name={"userName"} type={"text"} />
        <Input name={"password"} type={"password"} />
        <Button Type={"Login"} />
        <p>have a Account ? <Link to="/register" onClick={()=>setToggle(false)}>Sign Up</Link></p>
      </Form>
    </div>
  );
};
export default Login;
