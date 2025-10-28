import React, { useEffect, useState } from "react";
import Area from "./Area";
import type { IUniverseArea } from "../interfaces";
import {
    icons_keyboard_arrow_down,
} from "../../../components/Icons";
import { truncateText } from "../utils";

interface AreaSelectionProps {
    areas: IUniverseArea[];
}

const AreaSelection: React.FC<AreaSelectionProps> = ({ areas }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [areaData, setAreaData] = useState<IUniverseArea[]>([]);
    useEffect(() => {
        setAreaData([...areas]);

        return () => {
            setAreaData([]);
        };
    }, [areas]);


    const handleRename = (updatedArea: IUniverseArea) => {
        setAreaData(areaData.map(area => area.id === updatedArea.id ? updatedArea : area));
    };

    const handleActive = (updatedArea: IUniverseArea) => {
        setAreaData(areaData.map(area => ({ ...area, isActive: area.id === updatedArea.id })));
    };

    const handleDelete = (areaToDelete: IUniverseArea) => {
        setAreaData(areaData.filter(area => area.id !== areaToDelete.id));
    };

    const handleAddArea = () => {
        const newArea: IUniverseArea = {
            id: `${areaData.length + 1}`,
            name: `New Area ${areaData.length + 1}`,
            isActive: false,
        };
        setAreaData([...areaData, newArea]);
    };

    return (
        <div className="dropdown">
            <button className="tab btn-group" type="button" onClick={() => setIsOpen(!isOpen)}>
                <div
                    className="tab-1 tab-1-text"
                >
                    {truncateText("data.name")}
                </div>
                <img src={icons_keyboard_arrow_down} />
            </button>

            <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                {areaData.map(area => (
                    <Area
                        key={area.id}
                        area={area}
                        onRename={handleRename}
                        onActive={handleActive}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

        </div>
    );
};

export default AreaSelection;
