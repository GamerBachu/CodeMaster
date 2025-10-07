import React from 'react';
import Sidebar from './Sidebar';
import TopSection from './TopSection';
import MainCanvas from './MainCanvas';
import "./style/style2.css";

const CanvasAreaLayout: React.FC = () => {

  


  return (
    <div className="canvas-area">
      {/* Sidebar */}
      <div className="side-bar-1 bg-light border-end " >
        <Sidebar />
      </div>
      {/* Right Container */}
      <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden">
        {/* Top Section */}
        <div className="top-bar-1 border-bottom bg-white" >
          <TopSection />
        </div>
        {/* Main Canvas */}
        <div className="flex-grow-1 overflow-hidden">
          <MainCanvas />
        </div>
      </div>
    </div>
  );
};

export default CanvasAreaLayout;
