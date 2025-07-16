import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { Settings, Cloud, Stethoscope, Mail, Zap } from 'lucide-react';

const nodeIcons = {
  schedule: Settings,
  terraform: Cloud,
  pubmed: Stethoscope,
  email: Mail,
};

const CustomNode = ({ data }) => {
  const Icon = nodeIcons[data.id] || Zap;
  const statusClasses = {
    running: 'border-blue-500 bg-blue-50 shadow-blue-200',
    completed: 'border-green-500 bg-green-50 shadow-green-200',
    error: 'border-red-500 bg-red-50 shadow-red-200',
    idle: 'border-gray-300 bg-white shadow-sm',
  };

  return (
    <div className={`p-4 rounded-xl border-2 w-72 transition-all duration-300 shadow-lg hover:shadow-xl ${statusClasses[data.status]}`}>
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg bg-white/70 ${statusClasses[data.status].split(' ')[0]}`}>
          <Icon className={`w-8 h-8 ${data.status === 'running' ? 'animate-spin-slow' : ''} ${
            data.status === 'completed' ? 'text-green-600' : 
            data.status === 'error' ? 'text-red-600' :
            'text-gray-700'
          }`} />
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-gray-800">{data.label}</h3>
          <p className="text-sm text-gray-600">{data.description}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

export default function WorkflowChart({ nodeStatuses }) {
  const initialNodes = useMemo(() => [
    { id: 'schedule', type: 'custom', position: { x: 250, y: 0 }, data: { id: 'schedule', label: 'Schedule Trigger', description: "Daily at 9 AM" } },
    { id: 'terraform', type: 'custom', position: { x: 250, y: 150 }, data: { id: 'terraform', label: 'Execute Terraform', description: "Apply AWS configs" } },
    { id: 'pubmed', type: 'custom', position: { x: 250, y: 300 }, data: { id: 'pubmed', label: 'Scrape Research', description: "Fetch from PubMed API" } },
    { id: 'email', type: 'custom', position: { x: 250, y: 450 }, data: { id: 'email', label: 'Send Email Update', description: "Daily digest to you & GF" } },
  ], []);

  const initialEdges = [
    { id: 'e1-2', source: 'schedule', target: 'terraform', animated: true, style: { strokeWidth: 2 } },
    { id: 'e2-3', source: 'terraform', target: 'pubmed', animated: true, style: { strokeWidth: 2 } },
    { id: 'e3-4', source: 'pubmed', target: 'email', animated: true, style: { strokeWidth: 2 } },
  ];

  const nodesWithStatus = useMemo(() => 
    initialNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        status: nodeStatuses[node.id] || 'idle',
      }
    })), [initialNodes, nodeStatuses]);

  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner border border-gray-200 p-4">
      <ReactFlow
        nodes={nodesWithStatus}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        className="react-flow-subtle"
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
        <MiniMap nodeColor={n => {
            if (nodeStatuses[n.id] === 'completed') return '#10B981';
            if (nodeStatuses[n.id] === 'running') return '#3B82F6';
            if (nodeStatuses[n.id] === 'error') return '#EF4444';
            return '#E5E7EB';
        }} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </div>
  );
} 