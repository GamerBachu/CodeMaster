import React, { useEffect, useRef, useState } from "react";
import useUniverseCanvas from "./hooks/useUniverseCanvas";
import { useTabManagement } from "./hooks/useTabManagement";
import { AreaList } from "./components/AreaList";
import { AddAreaButton } from "./components/AddAreaButton";

const TopSection: React.FC = () => {
  const {
    isCanvasReady,
    universeData,
    addUniverseArea,
    renameUniverseArea,
    deleteUniverseArea,
  } = useUniverseCanvas();

  const refList = useRef<HTMLDivElement | null>(null);
  const [visibleWidth, setVisibleWidth] = useState(0);

  useEffect(() => {
    if (!isCanvasReady) return;
    const element = refList.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      setVisibleWidth(element.clientWidth);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isCanvasReady]);

  const {
    areas,
    totalShow,
    onRename,
    onActive,
    onDelete,
    onAdd,
  } = useTabManagement({
    isCanvasReady,
    universeData,
    addUniverseArea,
    renameUniverseArea,
    deleteUniverseArea,
    visibleWidth,
  });

  return (
    <div className="tabs-1" ref={refList}>
      <AreaList
        areas={areas}
        totalShow={totalShow}
        onActive={onActive}
        onRename={onRename}
        onDelete={onDelete}
      />
      <AddAreaButton onAdd={onAdd} />
    </div>
  );
};

export default TopSection;
