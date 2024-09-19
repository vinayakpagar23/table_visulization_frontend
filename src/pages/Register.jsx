import React, { useContext } from "react";
import { Form,message} from "antd";
import { useDispatch} from "react-redux";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { registerUser } from "../features/userSlice";
import "../style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Register = () => {
const {setToggle} = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async(values) => {
    const response = await dispatch(registerUser(values));
    console.log("register :: ",response.payload.statusCode)
    if (response.payload.statusCode === 200) {
        message.success(response.payload.message,3);
        navigate("/login");
        setToggle(true);   
    }

    else{
        message.error(response.payload.message,3);
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
        <h1 style={{ display: "flex", justifyContent: "center" }}>Register</h1>
        <Input name={"userName"} type={"text"} />
        <Input name={"email"} type={"email"} />
        <Input name={"password"} type={"password"} />
        <Button Type={"Login"} />
        <p>Have a Account ? <Link to="/login" onClick={()=>setToggle(true)}>Log In</Link></p>
      </Form>
    </div>
  );
};
export default Register;
