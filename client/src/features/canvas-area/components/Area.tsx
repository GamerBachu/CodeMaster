import React, { useEffect, useMemo, useState } from "react";
import type { IUniverseArea } from "../interfaces";
import {
    icons_file_delete,
    icons_file_edit,
    icons_edit_complete,
    icons_edit_close,
} from "../../../components/Icons";
import { truncateText } from "../utils";
interface AreaProps {
    area: IUniverseArea;
    onRename: (e: IUniverseArea) => void;
    onActive: (e: IUniverseArea) => void;
    onDelete: (e: IUniverseArea) => void;
}
const Area: React.FC<AreaProps> = ({ area, onRename, onActive, onDelete }) => {
    const initialValue = useMemo(() => {
        return {
            id: "0",
            name: "...",
            isActive: false,
        };
    }, []);

    const [data, setData] = useState<IUniverseArea>(initialValue);
    const [isRenaming, setIsRenaming] = useState<boolean>(false);

    useEffect(() => {
        setData(area);

        return () => {
            setData(initialValue);
        };
    }, [area, area.isActive, initialValue]);

    const onRenameComplete = () => {
        setIsRenaming(false);
        onRename(data);
    };

    const onRenameClose = () => {
        setData({ ...data, name: area.name });
        setIsRenaming(false);
    };



    const onActiveClick = () => {
        onActive(data);
    };

    const onDeleteClick = () => {
        onDelete(data);
    };


    return (
        <div
            className={`tab btn-group ${data.isActive ? "active" : ""}`}
            role="group"
            aria-label="action"
            id={`area-${data.id}`}
            data-testid={`area-${data.id}`}
        >
            {isRenaming ? (
                <>
                    <input
                        className="form-control-sm tab-1 "
                        value={data.name}
                        onChange={(e) => {
                            setData({ ...data, name: e.target.value });
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onRenameComplete();
                            }
                            if (e.key === "Escape") {
                                onRenameClose();
                            }
                        }}
                    ></input>
                    <button
                        type="button"
                        className="btn btn-sm ps-1"
                        onClick={onRenameComplete}
                    >
                        <img src={icons_edit_complete} />
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm px-1"
                        onClick={onRenameClose}
                    >
                        <img src={icons_edit_close} />
                    </button>
                </>
            ) : (
                <>
                    <button
                        type="button"
                        className="btn tab-1"
                        title={data.name}
                        onClick={onActiveClick}
                    >
                        {truncateText(data.name)}
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm px-0"
                        onClick={() => setIsRenaming(true)}
                    >
                        <img src={icons_file_edit} />
                    </button>
                    <button type="button" className="btn btn-sm px-1"
                        onClick={onDeleteClick}>
                        <img src={icons_file_delete} />
                    </button>
                </>
            )}
        </div>
    );
};

export default Area;
