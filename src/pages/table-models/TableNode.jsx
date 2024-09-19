import React from "react";
import { Handle, Position } from "@xyflow/react";
import { List } from "antd";

const TableNode = ({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        background: "#fff",
        position: "relative",
        maxHeight:"600px",
        maxWidth:"600px"
      }}
    >
      <Handle
        type="source"
        position={Position.Right}
        style={{
          top: "50%",
          background: "#555",
          borderRadius: 0,
          width: "10px",
          height: "10px",
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{
          top: "50%",
          background: "#555",
          borderRadius: 0,
          width: "10px",
          height: "10px",
        }}
      />
      <h2>{data.tableName}</h2>
      <List>
        {data.columns.map((col, index) => (
          <List.Item key={index} style={{ fontSize: 20 }}>
            <strong style={{ color: "red" ,marginRight:10}}> {col.name}</strong>:
            <strong style={{ color: "green" ,marginRight:10}}>{col.dataType}</strong>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default TableNode;
