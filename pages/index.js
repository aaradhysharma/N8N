import React, { useState, useEffect } from 'react';
import { Play, Pause, Settings, BookOpen, Stethoscope, Cloud, Mail } from 'lucide-react';

const WorkflowNode = ({ icon: Icon, title, description, status, onClick }) => (
  <div 
    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
      status === 'running' ? 'border-green-500 bg-green-50' : 
      status === 'error' ? 'border-red-500 bg-red-50' : 
      'border-gray-300 bg-white'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <Icon className={`w-8 h-8 ${status === 'running' ? 'text-green-600' : 'text-gray-600'}`} />
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

const Arrow = () => (
  <div className="flex justify-center items-center">
    <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-blue-500"></div>
  </div>
);

export default function Home() {
  const [workflowStatus, setWorkflowStatus] = useState('stopped');
  const [nodeStatuses, setNodeStatuses] = useState({
    schedule: 'idle',
    terraform: 'idle',
    pubmed: 'idle',
    email: 'idle'
  });

  const startWorkflow = async () => {
    setWorkflowStatus('running');
    // Simulate workflow execution
    const steps = ['schedule', 'terraform', 'pubmed', 'email'];
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setNodeStatuses(prev => ({
        ...prev,
        [steps[i]]: 'running'
      }));
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNodeStatuses(prev => ({
        ...prev,
        [steps[i]]: 'completed'
      }));
    }
    setWorkflowStatus('completed');
  };

  const stopWorkflow = () => {
    setWorkflowStatus('stopped');
    setNodeStatuses({
      schedule: 'idle',
      terraform: 'idle',
      pubmed: 'idle',
      email: 'idle'
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🚀 Wild Terraform-Medicine n8n Workflow
          </h1>
          <p className="text-xl text-gray-600">
            Automated Terraform learning + Medical research pipeline
          </p>
          <div className="mt-6 space-x-4">
            <button
              onClick={startWorkflow}
              disabled={workflowStatus === 'running'}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 inline-flex"
            >
              <Play className="w-5 h-5" />
              <span>Start Workflow</span>
            </button>
            <button
              onClick={stopWorkflow}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 inline-flex"
            >
              <Pause className="w-5 h-5" />
              <span>Stop Workflow</span>
            </button>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Workflow Visualization</h2>
          
          <div className="space-y-6">
            <WorkflowNode
              icon={Settings}
              title="Schedule Trigger"
              description="Daily trigger at 9 AM for Terraform study session"
              status={nodeStatuses.schedule}
            />
            
            <Arrow />
            
            <WorkflowNode
              icon={Cloud}
              title="Execute Terraform"
              description="Apply Terraform configs to AWS (S3, EC2, VPC)"
              status={nodeStatuses.terraform}
            />
            
            <Arrow />
            
            <WorkflowNode
              icon={Stethoscope}
              title="Scrape Medical Research"
              description="Fetch latest papers from PubMed API"
              status={nodeStatuses.pubmed}
            />
            
            <Arrow />
            
            <WorkflowNode
              icon={Mail}
              title="Send Email Update"
              description="Daily digest to you & your GF with Terraform quiz + medical insights"
              status={nodeStatuses.email}
            />
          </div>
        </div>

        <div id="features" className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
              Terraform Study Features
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Daily AWS infrastructure deployment practice</li>
              <li>• Terraform Associate exam questions</li>
              <li>• State management exercises</li>
              <li>• Module creation challenges</li>
              <li>• Cost optimization tracking</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Stethoscope className="w-6 h-6 mr-2 text-green-500" />
              Medical Research Integration
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• PubMed API integration</li>
              <li>• Research paper summaries</li>
              <li>• Medical terminology learning</li>
              <li>• Clinical trial updates</li>
              <li>• Research methodology tips</li>
            </ul>
          </div>
        </div>

        <div id="setup" className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-800 mb-2">🔧 Setup Instructions</h3>
          <div className="text-yellow-700 space-y-1">
            <p>1. n8n running at: <code className="bg-yellow-100 px-2 py-1 rounded">http://localhost:5678</code></p>
            <p>2. Import workflow: <code className="bg-yellow-100 px-2 py-1 rounded">workflows/terraform-study.json</code></p>
            <p>3. Configure AWS credentials in Terraform exec node</p>
            <p>4. Set up email credentials for notifications</p>
            <p>5. Study doc: <a href="https://docs.google.com/document/d/1wApYQBXRGIj9ISJtOJ4j0bdqxbccK-OYx38rjlhrA38/edit" className="text-blue-600 underline">Terraform + Medical Research Guide</a></p>
          </div>
        </div>
      </div>
    </div>
  );
} 