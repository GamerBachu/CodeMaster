import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  icons_file_add,

} from "../../components/Icons";
import useUniverseCanvas from "./hooks/useUniverseCanvas";
import type { IUniverseArea, IUniverseCanvasContext } from "./interfaces";
import Area from "./components/Area";
import { useDispatch } from "react-redux";
import { createToast } from "../../components/toasts/toastSlicer";
import locale from "../../resources";
import calculateVisibleTabs from "./utils/calculateVisibleTabs";
import AreaSelection from "./components/AreaSelection";

const TopSection: React.FC = () => {
  const {
    isCanvasReady,
    universeData,
    addUniverseArea,
    renameUniverseArea,
    deleteUniverseArea,
  }: IUniverseCanvasContext = useUniverseCanvas();

  const [areas, setAreas] = useState<IUniverseArea[]>([]);
  const dispatch = useDispatch();
  const refList = useRef<HTMLDivElement | null>(null);
  const totalShow = useRef<number>(1);
  const totalAreaCount = areas.length;
  const [visibleWidth, setVisibleWidth] = useState(0);
  console.log("visibleWidth", { universeData, areas });

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

  useEffect(() => {
    if (!isCanvasReady) return;
    if (visibleWidth < 10) return;
    if (
      universeData.current === undefined ||
      universeData.current.length === 0 ||
      universeData.current === null
    )
      return;

    const data = universeData.current.map((area) => {
      return {
        id: area.id,
        name: area.name,
        isActive: false,
      };
    });

    const isAnyOneActive = data.some((area) => area.isActive);
    if (!isAnyOneActive) {
      data[0].isActive = true;
    }

    setAreas(data);
    totalShow.current = calculateVisibleTabs(visibleWidth, data.length);
    return () => {
      setAreas([]);
    };
  }, [isCanvasReady, universeData, visibleWidth]);

  const onRename = useCallback(
    (e: IUniverseArea) => {
      const findArea = areas.find((area) => area.id === e.id);
      if (!findArea) return;
      if (findArea.name === e.name) return;
      findArea.name = e.name;
      setAreas([...areas]);
      renameUniverseArea({
        id: e.id,
        name: e.name,
        updatedAt: "",
        updatedBy: "",
        shapes: [],
      });
    },
    [areas, renameUniverseArea]
  );

  const onActive = useCallback(
    (e: IUniverseArea) => {
      const copyAreas = [...areas];
      copyAreas.forEach((area) => {
        area.isActive = area.id === e.id;
      });
      setAreas(copyAreas);
    },
    [areas]
  );

  const onDelete = useCallback(
    (e: IUniverseArea) => {
      const copyAreas = [...areas];
      if (copyAreas.length === 1) {
        dispatch(
          createToast({
            title: locale.universe_Canvas,
            description: locale.DeleteError,
            type: "warning",
          })
        );
        return;
      }
      const index = copyAreas.findIndex((area) => area.id === e.id);
      if (index !== -1) {
        copyAreas.splice(index, 1);
        setAreas(copyAreas);
        deleteUniverseArea({
          id: e.id,
          name: e.name,
          updatedAt: "",
          updatedBy: "",
          shapes: [],
        });

        totalShow.current = calculateVisibleTabs(visibleWidth, copyAreas.length);
        dispatch(
          createToast({
            title: locale.universe_Canvas,
            description: locale.DeleteSuccess,
            type: "warning",
          })
        );
      }
    },
    [areas, deleteUniverseArea, dispatch, visibleWidth]
  );

  const onAdd = useCallback(() => {
    // Create new area with unique id
    let newName = "Room-1";
    const existingNames = areas.map((area) => area.name);
    let counter = 1;
    while (existingNames.includes(newName)) {
      newName = `Room-${counter}`;
      counter++;
    }

    const newArea: IUniverseArea = {
      id: Date.now().toString(),
      name: newName,
      isActive: false,
    };

    // Update state using functional update to ensure latest state
    const copyAreas = [...areas, newArea];
    setAreas(copyAreas);
    totalShow.current = calculateVisibleTabs(visibleWidth, copyAreas.length);
    // Call the provided addUniverseArea function
    addUniverseArea({
      id: newArea.id,
      name: newArea.name,
      updatedAt: "",
      updatedBy: "",
      shapes: [],
    });
  }, [areas, addUniverseArea, visibleWidth]);
  console.log(totalShow.current, totalAreaCount, (totalShow?.current > totalAreaCount));
  return (
    <div className="tabs-1" ref={refList}>
      {areas.slice(0, totalShow.current).map((area) => (
        <Area
          key={area.id}
          area={area}
          onActive={onActive}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}

      {((totalAreaCount > totalShow?.current)) && <AreaSelection
        areas={areas.slice(totalShow.current, totalAreaCount)}
      ></AreaSelection>
      }

      <div className="tab action btn-group" role="group" aria-label="action">
        <button type="button" className="btn btn-sm" onClick={onAdd}>
          <img src={icons_file_add} />
        </button>
      </div>


    </div>
  );
};

export default TopSection;
