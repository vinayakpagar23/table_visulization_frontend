import React from "react";
import { Form, Input } from "antd";
import "../../style/Login.css";

function InputTag(props) {
  const { name, type } = props;
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: `Please input your ${name}`,
        },
      ]}
    >
      <Input
        type={type}
        placeholder={name}
        size="large"
        className={`Input-${name}`}
      />
    </Form.Item>
  );
}

export default InputTag;
