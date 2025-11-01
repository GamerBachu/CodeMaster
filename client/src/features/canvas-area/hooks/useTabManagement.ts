import { useState, useCallback, useEffect, useMemo } from 'react';
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
  changeUniverseArea: IUniverseCanvasContext['changeUniverseArea'];
  visibleWidth: number;
}

export const useTabManagement = ({
  isCanvasReady,
  universeData,
  addUniverseArea,
  renameUniverseArea,
  deleteUniverseArea,
  changeUniverseArea,
  visibleWidth,
}: useTabManagementProps) => {
  const [areas, setAreas] = useState<IUniverseArea[]>([]);
  const dispatch = useDispatch();
  const totalShow = useMemo(() => calculateVisibleTabs(visibleWidth, areas.length), [visibleWidth, areas.length]);

  useEffect(() => {
    if (!isCanvasReady || visibleWidth < 10 || !universeData.current) {
      setAreas([]);
      return;
    }

    const data = universeData.current.map((area) => ({
      id: area.id,
      name: area.name,
      isActive: false,
    }));

    if (data.length > 0 && !data.some((area) => area.isActive)) {
      data[0].isActive = true;
      changeUniverseArea("", data[0].id);
    }

    setAreas(data);

    return () => {
      setAreas([]);
    };
  }, [changeUniverseArea, isCanvasReady, universeData, visibleWidth]);

  const onRename = useCallback(
    (area: IUniverseArea) => {
      setAreas((prevAreas) => {
        const areaExists = prevAreas.some(
          (a) => a.id === area.id && a.name === area.name
        );
        if (areaExists) {
          return prevAreas;
        }

        const isAnyActive = prevAreas.some((a) => a.isActive);

        const newAreas = prevAreas.map((a) => {
          if (a.id === area.id) {
            return {
              ...a,
              name: area.name,
              isActive: !isAnyActive ? true : a.isActive,
            };
          }
          return a;
        });

        renameUniverseArea({
          id: area.id,
          name: area.name,
          updatedAt: '',
          updatedBy: '',
          shapes: [],
        });

        return newAreas;
      });
    },
    [renameUniverseArea]
  );

  const onActive = useCallback(
    (activeArea: IUniverseArea) => {
      const currentActiveId = areas.find((a) => a.isActive)?.id;
      if (currentActiveId === activeArea.id) {
        return;
      }

      changeUniverseArea(currentActiveId ?? '', activeArea.id);
      setAreas((prevAreas) =>
        prevAreas.map((area) => ({
          ...area,
          isActive: area.id === activeArea.id,
        }))
      );
    },
    [areas, changeUniverseArea]
  );

  const onDelete = useCallback(
    (areaToDelete: IUniverseArea) => {
      setAreas((prevAreas) => {
        if (prevAreas.length === 1) {
          dispatch(
            createToast({
              title: locale.universe_Canvas,
              description: locale.DeleteError,
              type: 'danger',
            })
          );
          return prevAreas;
        }

        const deletedAreaIndex = prevAreas.findIndex(
          (a) => a.id === areaToDelete.id
        );
        if (deletedAreaIndex === -1) {
          return prevAreas;
        }

        const deletedArea = prevAreas[deletedAreaIndex];
        let newAreas = prevAreas.filter((a) => a.id !== areaToDelete.id);

        if (deletedArea.isActive) {
          const newActiveIndex = Math.min(
            deletedAreaIndex,
            newAreas.length - 1
          );
          const newActiveArea = newAreas[newActiveIndex];

          if (newActiveArea) {
            changeUniverseArea(deletedArea.id, newActiveArea.id);
            newAreas = newAreas.map((a, index) => ({
              ...a,
              isActive: index === newActiveIndex,
            }));
          }
        }

        deleteUniverseArea(
          {
            id: areaToDelete.id,
            name: areaToDelete.name,
            updatedAt: '',
            updatedBy: '',
            shapes: [],
          }
        );
        dispatch(
          createToast({
            title: locale.universe_Canvas,
            description: locale.DeleteSuccess,
            type: 'warning',
          })
        );
        return newAreas;
      });
    },
    [changeUniverseArea, deleteUniverseArea, dispatch]
  );

  const onAdd = useCallback(() => {
    setAreas((prevAreas) => {
      const existingNames = new Set(prevAreas.map((area) => area.name));
      let counter = 1;
      let newName = `Room-${counter}`;
      while (existingNames.has(newName)) {
        counter++;
        newName = `Room-${counter}`;
      }

      const newArea: IUniverseArea = {
        id: Date.now().toString(),
        name: newName,
        isActive: false,
      };

      addUniverseArea({
        id: newArea.id,
        name: newArea.name,
        updatedAt: '',
        updatedBy: '',
        shapes: [],
      });

      return [...prevAreas, newArea];
    });
  }, [addUniverseArea]);

  return {
    areas,
    totalShow,
    onRename,
    onActive,
    onDelete,
    onAdd,
  };
};