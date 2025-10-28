import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createToast } from '../../../components/toasts/toastSlicer';
import locale from '../../../resources';
import type { IUniverseArea } from '../interfaces';
import type { IUniverseCanvasContext } from '../interfaces';
import calculateVisibleTabs from '../utils/calculateVisibleTabs';

interface useTabManagementProps {
  isCanvasReady: boolean;
  universeData: IUniverseCanvasContext['universeData'];
  addUniverseArea: IUniverseCanvasContext['addUniverseArea'];
  renameUniverseArea: IUniverseCanvasContext['renameUniverseArea'];
  deleteUniverseArea: IUniverseCanvasContext['deleteUniverseArea'];
  visibleWidth: number;
}

export const useTabManagement = ({
  isCanvasReady,
  universeData,
  addUniverseArea,
  renameUniverseArea,
  deleteUniverseArea,
  visibleWidth,
}: useTabManagementProps) => {
  const [areas, setAreas] = useState<IUniverseArea[]>([]);
  const dispatch = useDispatch();
  const totalShow = calculateVisibleTabs(visibleWidth, areas.length);

  useEffect(() => {
    if (!isCanvasReady || visibleWidth < 10) return;
    if (!universeData.current?.length) return;

    const data = universeData.current.map((area) => ({
      id: area.id,
      name: area.name,
      isActive: false,
    }));

    const isAnyOneActive = data.some((area) => area.isActive);
    if (!isAnyOneActive) {
      data[0].isActive = true;
    }

    setAreas(data);

    return () => {
      setAreas([]);
    };
  }, [isCanvasReady, universeData, visibleWidth]);

  const onRename = useCallback(
    (area: IUniverseArea) => {
      const findArea = areas.find((a) => a.id === area.id);
      if (!findArea || findArea.name === area.name) return;

      findArea.name = area.name;

      const isAnyActive = areas.some((a) => a.isActive === true);
      if (isAnyActive === false) {
        findArea.isActive = true;
      }


      setAreas([...areas]);
      renameUniverseArea({
        id: area.id,
        name: area.name,
        updatedAt: '',
        updatedBy: '',
        shapes: [],
      });
    },
    [areas, renameUniverseArea]
  );

  const onActive = useCallback(
    (activeArea: IUniverseArea) => {
      setAreas(prevAreas =>
        prevAreas.map(area => ({
          ...area,
          isActive: area.id === activeArea.id
        }))
      );
    },
    []
  );

  const onDelete = useCallback(
    (area: IUniverseArea) => {
      if (areas.length === 1) {
        dispatch(
          createToast({
            title: locale.universe_Canvas,
            description: locale.DeleteError,
            type: 'warning',
          })
        );
        return;
      }

      setAreas(prevAreas => prevAreas.filter(a => a.id !== area.id));
      deleteUniverseArea({
        id: area.id,
        name: area.name,
        updatedAt: '',
        updatedBy: '',
        shapes: [],
      });

      dispatch(
        createToast({
          title: locale.universe_Canvas,
          description: locale.DeleteSuccess,
          type: 'warning',
        })
      );
    },
    [areas.length, deleteUniverseArea, dispatch]
  );

  const onAdd = useCallback(() => {
    let newName = 'Room-1';
    const existingNames = areas.map((area) => area.name);
    let counter = 1;
    while (existingNames.includes(newName)) {
      counter++;
      newName = `Room-${counter}`;
    }

    const newArea: IUniverseArea = {
      id: Date.now().toString(),
      name: newName,
      isActive: false,
    };

    setAreas(prevAreas => [...prevAreas, newArea]);

    addUniverseArea({
      id: newArea.id,
      name: newArea.name,
      updatedAt: '',
      updatedBy: '',
      shapes: [],
    });
  }, [areas, addUniverseArea]);

  return {
    areas,
    totalShow,
    onRename,
    onActive,
    onDelete,
    onAdd,
  };
};
