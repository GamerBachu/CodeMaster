import React from "react";
import Sidebar from "./Sidebar";
import TopSection from "./TopSection";
import MainCanvas from "./MainCanvas";
import "./style/style2.css";
import { UniverseCanvasProvider } from "./context/UniverseCanvasProvider";

const CanvasAreaLayout: React.FC = () => {
  return (
    <UniverseCanvasProvider>
      <div className="canvas-area">
        {/* Sidebar */}
        <div className="side-bar-1 bg-light border-end ">
          <Sidebar />
        </div>
        {/* Right Container */}
        <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden">
          {/* Top Section */}
          <div className="top-bar-1">
            <TopSection />
          </div>
          {/* Main Canvas */}
          <div className="main-area">
            <MainCanvas />
          </div>
        </div>
      </div>
    </UniverseCanvasProvider>
  );
};

export default CanvasAreaLayout;
