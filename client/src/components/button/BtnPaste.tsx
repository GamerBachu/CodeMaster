import { icons_paste } from "../Icons";

type Props = {
    buttonId?: string;
    className?: string;
    classNameLabel?: string;
    classNameImg?: string;
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const BtnPaste = ({
    buttonId,
    className = "",
    classNameLabel = "",
    classNameImg = "",
    label,
    onClick,
}: Props) => {
    return (
        <button
            type="button"
            className={`btn btn-sm btn-outline-light align-content-center ${className}`}
            id={buttonId}
            data-testid={buttonId}
            onClick={onClick}
        >
            <img src={icons_paste} className={`btn-sm-align ${classNameImg}`} />{" "}
            <label className={`${classNameLabel}`}>{label}</label>
        </button>
    );
};

export default BtnPaste; 