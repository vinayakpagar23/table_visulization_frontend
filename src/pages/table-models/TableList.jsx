import { Button, List ,message} from "antd";
import React, { useContext } from "react";
import { useDispatch} from 'react-redux';
import { logoutUser } from "../../features/userSlice";
import AddTable from "../../components/AddTbale";
import { AuthContext } from "../../context/authContext";

const TableList = ({ tables, onSelectTable }) => {
  const {setAuthenticated} = useContext(AuthContext);
  const dispatch =  useDispatch();
  const handleLogout =async()=>{
    const response = await dispatch(logoutUser());


    if(response.payload.statusCode===200){
      message.success(response.payload.message,3);
      setAuthenticated(false);
    }
    else{
      message.error(response.payload.message,3);
      setAuthenticated(false);
    }
    
  }
  return (
    <div
      style={{
        width: "200px",
        padding: "10px",
        borderRight: "1px solid #ccc",
        height: "100vh",
        overflowY: "auto",
        margin: "auto",
      }}
    >
      <h2>Tables</h2>
      <List
        style={{
          height: 400,
          overflow: "scroll",
          borderBottom: "1px solid black",
          marginBottom: 10,
        }}
      >
        {tables.map((table, index) => (
          <List.Item
            key={index}
            onClick={() => onSelectTable(table)}
            style={{
              cursor: "pointer",
              padding: "5px",
              borderBottom: "1px solid #eee",
              fontWeight: "bold",
            }}
          >
            {table.tableName}
          </List.Item>
        ))}
      </List>
      <AddTable />
      <Button
        style={{ position: "relative", top: 350, width: "90%" }}
        type="primary"
        size="large"
        danger
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default TableList;
