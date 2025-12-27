import { icons_flip_to_back } from "../Icons";

type Props = {
    buttonId?: string;
    className?: string;
    classNameLabel?: string;
    classNameImg?: string;
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const BtnSendBack = ({
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
            <img src={icons_flip_to_back} className={`btn-sm-align ${classNameImg}`} />{" "}
            <label className={`${classNameLabel}`}>{label}</label>
        </button>
    );
};

export default BtnSendBack; 