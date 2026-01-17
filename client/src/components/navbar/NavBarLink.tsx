import { Link } from "react-router";

type NavBarLinkProps = {
    id: number;
    to: string;
    active: boolean;
    onClick: (id: number) => void;
    value: string;
};

const NavBarLink = ({ id, to, active, onClick, value }: NavBarLinkProps) => {
    return (
        <li className="nav-item">
            <Link
                to={to}
                className={`nav-link link-body-emphasis text-capitalize px-2 ${active === true ? " active" : ""}`}
                onClick={() => {
                    onClick(id);
                }}
            >
                {value}
            </Link>
        </li>
    );
};

export default NavBarLink;