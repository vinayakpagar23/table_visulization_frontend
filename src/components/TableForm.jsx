import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {fetchTables, insertTable} from "../features/tableSlice";

import { Button, Form, Input, Space ,message as messageAnt} from 'antd';
import InputTag from './UI/Input';

const TableForm = () =>{

    const { code,message} = useSelector((state) => state.table);
    const dispatch = useDispatch();
    const onFinish = async(values) => {
        console.log('Received values of form:', values);
        const response = await dispatch(insertTable(values));
        if(response.payload.statusCode ===200){
            console.log("fetching Tbales     ")
            dispatch(fetchTables());
            messageAnt.success(message,3);
        }
        else{
            messageAnt.error(response.payload.message,3);
        }   
      };
  
    return (
  <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    autoComplete="off"
  >
    <InputTag name={"tableName"} type={"text"} />
    <Form.List name="columns">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                display: 'flex',
                marginBottom: 8,
              }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'name']}
                rules={[
                  {
                    required: true,
                    message: 'Missing name',
                  },
                ]}
              >
                <Input placeholder="name" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'dataType']}
                rules={[
                  {
                    required: true,
                    message: 'Missing type',
                  },
                ]}
              >
                <Input placeholder="type" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
)};
export default TableForm;