import React, { Fragment, useState } from "react";
import Area from "./Area";
import type { IUniverseArea } from "../interfaces";
import { icons_keyboard_arrow_down } from "../../../components/Icons";
import { truncateText } from "../utils";
import locale from "../../../resources";

interface AreaSelectionProps {
    areas: IUniverseArea[];
    onActive: (area: IUniverseArea) => void;
    onRename: (area: IUniverseArea) => void;
    onDelete: (area: IUniverseArea) => void;
}

const AreaSelection: React.FC<AreaSelectionProps> = ({
    areas,
    onActive,
    onRename,
    onDelete,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const isAnyActive = areas.find((area) => area.isActive);

    return (
        <div className={`dropdown`}>
            <button
                className={`tab btn-group ${isAnyActive ? "active" : ""}`}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="tab-1 tab-1-text">
                    {truncateText(isAnyActive ? isAnyActive.name : locale.select)}
                </div>
                <img src={icons_keyboard_arrow_down} />
            </button>

            <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                {areas.map((area) => {
                    return (
                        <Fragment key={area.id}>
                            <Area
                                key={area.id}
                                area={area}
                                onRename={onRename}
                                onActive={onActive}
                                onDelete={onDelete}
                            />
                            <hr className="mx-auto mt-0 mb-2"></hr>
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default AreaSelection;
