import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NetworkTopology from './pages/NetworkTopology';
import Optimization from './pages/Optimization';
import Simulation from './pages/Simulation';
import Reports from './pages/Reports';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'topology':
        return <NetworkTopology />;
      case 'optimization':
        return <Optimization />;
      case 'simulation':
        return <Simulation />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
