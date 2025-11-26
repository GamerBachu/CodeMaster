import { Link, NavLink } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import appRoute from "../../routes/appRoute";
import actionLink from "./actionLink";
import NavBarLink from "./NavBarLink";

const NavbarContainer = () => {
    const [authLink, setAuthLink] = useState([...actionLink]);
    const [visibleCount, setVisibleCount] = useState(actionLink.length);

    const linkClick = (id: number) => {
        setAuthLink((prev) =>
            prev.map((link) => ({ ...link, active: link.id === id }))
        );
    };

    const navWrapperEle = useRef<HTMLUListElement>(null);

    // Returns how many items can be shown before overflow
    const calculateVisibleCount = useCallback(() => {
        if (!navWrapperEle.current) return authLink.length;
        const ul = navWrapperEle.current;
        const clientWidth = ul.clientWidth;
        const moreTabWidth = 65; // px
        let widthSum = 0;
        let count = 0;
        for (let i = 0; i < authLink.length; i++) {
            const li = ul.children[i] as HTMLElement;
            if (!li) break;
            // If there will be overflow, reserve space for the More tab
            const remaining = authLink.length - i;
            if (remaining > 1) {
                if (widthSum + li.offsetWidth + moreTabWidth > clientWidth) {
                    break;
                }
            } else {
                if (widthSum + li.offsetWidth > clientWidth) {
                    break;
                }
            }
            widthSum += li.offsetWidth;
            count++;
        }
        return count;
    }, [authLink]);

    useEffect(() => {
        const handleResize = () => {
            const count = calculateVisibleCount();
            setVisibleCount(count);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [authLink, calculateVisibleCount]);

    // Split links into visible and overflow
    const visibleLinks = authLink.slice(0, visibleCount);
    const overflowLinks = authLink.slice(visibleCount);

    // Dropdown open state
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Close dropdown on outside click
    useEffect(() => {
        if (!dropdownOpen) return;
        const handleClick = (e: MouseEvent) => {
            const dropdown = document.getElementById("navbarDropdownMenu");
            if (dropdown && !dropdown.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [dropdownOpen]);

    return (
        <nav className="wrapper-header bg-body-tertiary border-bottom">
            <div className="d-flex">
                <ul
                    ref={navWrapperEle}
                    className="nav me-auto flex-nowrap w-100 overflow-hidden text-nowrap"
                >
                    {visibleLinks.map((link) => (
                        <NavBarLink
                            id={link.id}
                            key={link.id}
                            to={link.path}
                            active={link.active}
                            value={link.value}
                            onClick={(id) => {
                                linkClick(id);
                                setDropdownOpen(false);
                            }}
                        ></NavBarLink>
                    ))}
                    {overflowLinks.length > 0 && (
                        <li className="nav-item">
                            <button
                                className={`nav-link link-body-emphasis px-2 text-capitalize dropdown-toggle ${overflowLinks.findIndex((p) => p.active === true) > -1
                                    ? "active"
                                    : ""
                                    }`}
                                type="button"
                                aria-expanded={dropdownOpen}
                                onClick={() => setDropdownOpen((open) => !open)}
                            >
                                More
                            </button>
                            <ul
                                className={`${dropdownOpen
                                    ? "dropdown-menu show position-fixed  overflow-auto   h-25"
                                    : "dropdown-menu"
                                    }`}
                                style={{ right: "50px" }}
                            >
                                {overflowLinks.map((link) => (
                                    <NavBarLink
                                        id={link.id}
                                        key={link.id}
                                        to={link.path}
                                        active={link.active}
                                        value={link.value}
                                        onClick={(id) => {
                                            linkClick(id);
                                            setDropdownOpen(false);
                                        }}
                                    ></NavBarLink>
                                ))}
                            </ul>
                        </li>
                    )}
                </ul>

                <ul className="nav">
                   <NavBarLink
                            id={-10}
                            to={appRoute.LOGOUT.path}
                            active={false}
                            value={appRoute.LOGOUT.value}
                            onClick={() => { }}
                        ></NavBarLink>
                </ul>
            </div>
        </nav>
    );
};

export default NavbarContainer;
