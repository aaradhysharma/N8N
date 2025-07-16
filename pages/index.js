import React, { useState, useCallback } from 'react';
import { Play, Pause, AlertTriangle } from 'lucide-react';
import WorkflowChart from '../components/WorkflowChart';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  const [workflowStatus, setWorkflowStatus] = useState('stopped');
  const [nodeStatuses, setNodeStatuses] = useState({
    schedule: 'idle',
    terraform: 'idle',
    pubmed: 'idle',
    email: 'idle'
  });

  const startWorkflow = useCallback(async () => {
    setWorkflowStatus('running');
    const steps = ['schedule', 'terraform', 'pubmed', 'email'];
    
    // Reset statuses to idle before starting
    const initialStatuses = steps.reduce((acc, step) => ({ ...acc, [step]: 'idle' }), {});
    setNodeStatuses(initialStatuses);

    await new Promise(res => setTimeout(res, 500));
    
    for (let i = 0; i < steps.length; i++) {
      const currentStep = steps[i];
      
      setNodeStatuses(prev => ({ ...prev, [currentStep]: 'running' }));
      
      // Simulate work
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate potential failure
      const isSuccess = Math.random() > 0.1; // 10% chance of failure for demo
      if (!isSuccess) {
        setNodeStatuses(prev => ({ ...prev, [currentStep]: 'error' }));
        setWorkflowStatus('error');
        return; 
      }
      
      setNodeStatuses(prev => ({ ...prev, [currentStep]: 'completed' }));
    }
    
    setWorkflowStatus('completed');
  }, []);

  const stopWorkflow = useCallback(() => {
    setWorkflowStatus('stopped');
    const initialStatuses = Object.keys(nodeStatuses).reduce((acc, key) => ({ ...acc, [key]: 'idle' }), {});
    setNodeStatuses(initialStatuses);
  }, [nodeStatuses]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            The 2025 n8n Workflow
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A visual simulation of an automated Terraform learning & medical research pipeline.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={startWorkflow}
              disabled={workflowStatus === 'running'}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Simulation
            </button>
            <button
              onClick={stopWorkflow}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105"
            >
              <Pause className="w-5 h-5 mr-2" />
              Stop & Reset
            </button>
          </div>
          {workflowStatus === 'error' && (
            <div className="mt-4 inline-flex items-center bg-red-100 text-red-800 p-3 rounded-lg">
               <AlertTriangle className="w-5 h-5 mr-2" />
               Workflow simulation failed! Please reset and try again.
            </div>
          )}
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-2 sm:p-4 mb-12 border border-gray-200/50">
          <WorkflowChart nodeStatuses={nodeStatuses} />
        </div>

        <div id="features" className="grid md:grid-cols-2 gap-8 mb-12">
          <FeatureCard 
            title="Terraform Study Features"
            features={[
              "Daily AWS infrastructure practice",
              "Terraform Associate exam questions",
              "State management exercises",
              "Module creation challenges",
              "Cost optimization tracking"
            ]}
          />
          <FeatureCard 
            title="Medical Research Integration"
            isMedical={true}
            features={[
              "PubMed API integration",
              "Research paper summaries",
              "Medical terminology learning",
              "Clinical trial updates",
              "Research methodology tips"
            ]}
          />
        </div>

        <div id="setup" className="bg-gray-800 text-white rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">🔧 Setup & Tech Stack</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <p className="font-semibold text-lg mb-2">Instructions</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>n8n running at: <code className="bg-gray-700 px-2 py-1 rounded-md text-sm">http://localhost:5678</code></li>
                <li>Import workflow: <code className="bg-gray-700 px-2 py-1 rounded-md text-sm">workflows/terraform-study.json</code></li>
                <li>Configure AWS & email credentials in n8n</li>
                <li>Study doc: <a href="https://docs.google.com/document/d/1wApYQBXRGIj9ISJtOJ4j0bdqxbccK-OYx38rjlhrA38/edit" className="text-blue-400 underline hover:text-blue-300">Research Guide</a></li>
              </ol>
            </div>
             <div>
              <p className="font-semibold text-lg mb-2">Tech Used</p>
              <ul className="list-disc list-inside space-y-2">
                  <li>Next.js & React</li>
                  <li>Tailwind CSS</li>
                  <li>React Flow for charting</li>
                  <li>Vercel for deployment</li>
                  <li>n8n for automation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 