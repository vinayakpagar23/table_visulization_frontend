import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTables } from "../../features/tableSlice";
import "@xyflow/react/dist/style.css";
import TableNode from "./TableNode";
import TableList from "./TableList";
import { Button } from "antd";


const generateNode = (table, index) => ({
  id: `${index + 1}`,
  position: { x: index * 200, y: 100 },
  data: {
    tableName: table.tableName,
    columns: table.columns,
    Component: TableNode,
  },
  type: "tableNode",
});

const Visualizer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [connectable, setConnectable] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const { tables} = useSelector(
    (state) => state.table
  );
  const dispatch = useDispatch();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onEdgeClick = useCallback(
    (event, edge) => {
      const edgeId = edge.id;
      const updatedEdges = edges.filter((e) => e.id !== edgeId);
      setEdges(updatedEdges);
    },
    [edges, setEdges]
  );

  const handleSelectTable = (table) => {
    if (!nodes.find((node) => node.data.tableName === table.tableName)) {
      setNodes((nds) => [...nds, generateNode(table, nds.length)]);
    }
  };

  const addInitialEdges = () => {
    const newEdges = [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
      { id: "e3-4", source: "3", target: "4" },
    ];
    setEdges(newEdges);
  };

  useEffect(() => {
    dispatch(fetchTables());
    setHasFetched(true);
  }, [hasFetched]);


  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <TableList tables={tables} onSelectTable={handleSelectTable} />
      <div style={{ flexGrow: 1 }}>
        <Button
          onClick={addInitialEdges}
          type="primary"
          style={{ position: "absolute", zIndex: 10 }}
        >
          Add Example Connections
        </Button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={connectable ? onConnect : null}
          onEdgeClick={onEdgeClick}
          connectable={connectable}
          nodeTypes={{ tableNode: TableNode }}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Visualizer;
