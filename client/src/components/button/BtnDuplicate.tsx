import { icons_duplicate } from "../Icons";

type Props = {
    buttonId?: string;
    className?: string;
    classNameLabel?: string;
    classNameImg?: string;
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const BtnDuplicate = ({
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
            <img src={icons_duplicate} className={`btn-sm-align ${classNameImg}`} />{" "}
            <label className={`${classNameLabel}`}>{label}</label>
        </button>
    );
};

export default BtnDuplicate;  