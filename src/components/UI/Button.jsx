import React from "react";
import { Button, Form } from "antd";
import "../../style/Login.css";
function ButtonTag({ Type }) {
  return (
    <Form.Item>
      <Button
        className={`${Type}-button`}
        size="large"
        type="primary"
        htmlType="submit"
      >
        Submit
      </Button>
    </Form.Item>
  );
}

export default ButtonTag;
