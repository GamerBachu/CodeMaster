import React from "react";
import type { IUniverseArea } from "../interfaces";
import Area from "./Area";
import AreaSelection from "./AreaSelection";

interface AreaListProps {
    areas: IUniverseArea[];
    totalShow: number;
    onActive: (area: IUniverseArea) => void;
    onRename: (area: IUniverseArea) => void;
    onDelete: (area: IUniverseArea) => void;
}

export const AreaList: React.FC<AreaListProps> = ({
    areas,
    totalShow,
    onActive,
    onRename,
    onDelete,
}) => {
    const visibleAreas = areas.slice(0, totalShow);
    const remainingAreas = areas.slice(totalShow);
    const hasRemainingAreas = areas.length > totalShow;

    return (
        <>
            {visibleAreas.map((area) => (
                <Area
                    key={area.id}
                    area={area}
                    onActive={onActive}
                    onRename={onRename}
                    onDelete={onDelete}
                />
            ))}

            {hasRemainingAreas && (
                <AreaSelection
                    areas={remainingAreas}
                    onActive={onActive}
                    onRename={onRename}
                    onDelete={onDelete}
                />
            )}
        </>
    );
};
