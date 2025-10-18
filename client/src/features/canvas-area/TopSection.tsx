import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  icons_file_add,
  icons_keyboard_arrow_down,
} from "../../components/Icons";
import useUniverseCanvas from "./hooks/useUniverseCanvas";
import type { IUniverseArea } from "./interfaces";
import Area from "./components/Area";
import { useDispatch } from "react-redux";
import { createToast } from "../../components/toasts/toastSlicer";
import locale from "../../resources";

const TopSection: React.FC = () => {
  const { state, dispatch } = useUniverseCanvas();
  const [areas, setAreas] = useState<IUniverseArea[]>([]);
  const dispatch2 = useDispatch();
  const refList = useRef<HTMLDivElement | null>(null);
  const totalShow = useRef<number>(1);
  const [visibleWidth, setVisibleWidth] = useState(0);

  useEffect(() => {
    const element = refList.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      setVisibleWidth(element.clientWidth);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const data = state.universe.map((area) => {
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
    return () => {
      setAreas([]);
    };
  }, [state.universe]);

  const onRename = useCallback(
    (e: IUniverseArea) => {
      const findArea = areas.find((area) => area.id === e.id);
      if (!findArea) return;
      if (findArea.name === e.name) return;
      findArea.name = e.name;
      setAreas([...areas]);
      dispatch({ type: "SET_UNIVERSE_NAME", payload: e });
    },
    [areas, dispatch]
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
        dispatch2(
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
        dispatch({ type: "DELETE_UNIVERSE_AREA", payload: e });
        dispatch2(
          createToast({
            title: locale.universe_Canvas,
            description: locale.DeleteSuccess,
            type: "warning",
          })
        );
      }
    },
    [areas, dispatch, dispatch2]
  );

  const onAdd = useCallback(() => {
    const newArea: IUniverseArea = {
      id: Date.now().toString(),
      name: "New Area",
      isActive: false,
    };
    setAreas((prev) => [...prev, newArea]);
    dispatch({ type: "ADD_UNIVERSE_AREA", payload: newArea });
  }, [dispatch]);

  return (
    <div className="tabs-1" id="2341234" ref={refList}>
      {areas.map((area) => (
        <Area
          key={area.id}
          area={area}
          onActive={onActive}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}

      <div className="tab action btn-group" role="group" aria-label="action">
        <button type="button" className="btn btn-sm"
          onClick={onAdd}>
          <img src={icons_file_add} />
        </button>
      </div>

      <div className="tab action btn-group" role="group" aria-label="action">
        <button type="button" className="btn btn-sm">
          <img src={icons_keyboard_arrow_down} />
        </button>
      </div>
    </div>
  );
};

export default TopSection;
