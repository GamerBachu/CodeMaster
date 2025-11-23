import { Link, NavLink } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import appRoute from "../../routes/appRoute";
import actionLink from "./actionLink";

 
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
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
            const dropdown = document.getElementById('navbarDropdownMenu');
            if (dropdown && !dropdown.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [dropdownOpen]);

    return (
        <nav className="wrapper-header bg-body-tertiary border-bottom">
            <div className="d-flex">

                <ul ref={navWrapperEle} className="nav me-auto flex-nowrap w-100 overflow-hidden text-nowrap" >
                    {visibleLinks.map((link) => (
                        <li className="nav-item" key={link.id}>
                            <Link
                                to={link.path}
                                className={`nav-link link-body-emphasis px-2 text-capitalize ${link.active ? "active" : ""}`}
                                onClick={() => linkClick(link.id)}
                            >
                                {link.value}
                            </Link>
                        </li>
                    ))}
                    {overflowLinks.length > 0 && (
                        <li className={`nav-item `} >
                            <button
                                className="nav-link link-body-emphasis px-2 text-capitalize dropdown-toggle ove "
                                type="button"
                                aria-expanded={dropdownOpen}
                                onClick={() => setDropdownOpen((open) => !open)}
                            >
                                More
                            </button>
                            <ul className={`${dropdownOpen ? 'dropdown-menu show position-fixed  overflow-auto   h-25' : 'dropdown-menu'}`}
                            style={{right:"50px"}}
                            >
                                {overflowLinks.map((link) => (
                                    <li className="nav-item" key={link.id}>
                                        <Link
                                            to={link.path}
                                            className={`nav-link link-body-emphasis text-capitalize${link.active ? " active" : ""}`}
                                            onClick={() => {
                                                linkClick(link.id);
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            {link.value}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                </ul>



                <ul className="nav">
                    <li className="nav-item">
                        <NavLink
                            to={appRoute.LOGOUT.path}
                            className={({ isActive }) =>
                                "nav-link link-body-emphasis px-2 text-capitalize" +
                                (isActive ? " active" : "")
                            }
                        >
                            {appRoute.LOGOUT.value}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavbarContainer;