import { icons_file_edit } from "../Icons";

type Props = {
    buttonId?: string;
    type: string;
    className?: string;
    classNameLabel?: string;
    classNameImg?: string;
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const UpdateButton = ({
    buttonId,
    type = "button",
    className = "",
    classNameLabel = "",
    classNameImg = "",
    label,
    onClick,
}: Props) => {
    return (<> {(type === "submit") ? <>
        <button
            type="submit"
            className={`btn btn-sm btn-outline-info align-content-center ${className}`}
            id={buttonId}
            data-testid={buttonId}
        >
            <img src={icons_file_edit} className={`btn-sm-align ${classNameImg}`} />{" "}
            <label className={`${classNameLabel}`}>{label}</label>
        </button>
    </> : <>
        <button
            type="button"
            className={`btn btn-sm btn-outline-info align-content-center ${className}`}
            id={buttonId}
            data-testid={buttonId}
            onClick={onClick}
        >
            <img src={icons_file_edit} className={`btn-sm-align ${classNameImg}`} />{" "}
            <label className={`${classNameLabel}`}>{label}</label>
        </button>
    </>}
    </>
    );
};

export default UpdateButton;
