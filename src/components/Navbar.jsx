import { useState } from "react";
import logo from "../assets/logo.png";
import { LINKS } from "../constants";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleScroll = (event, targetId) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offset,
                behavior: "smooth"
            });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className="fixed top-4 z-50 w-full flex items-center justify-center">
            <div className="flex w-full max-w-5xl items-center justify-between overflow-hidden p-4 backdrop-blur-lg lg:m-2 lg:rounded-full lg:shadow-lg">
                <img src={logo} alt="logo" width={80} height={22} />
                <div className="hidden space-x-6 lg:flex">
                    {LINKS.map((link, index) => (
                        <a
                            key={index}
                            href={`#${link.targetId}`}
                            className={`text-sm ${index !== 0 ? "border-l-2 border-neutral-300/20 pl-2" : ""} hover:opacity-50`}
                            onClick={(e) => handleScroll(e, link.targetId)}
                        >
                            {link.text}
                        </a>
                    ))}
                </div>
                <div className="lg:hidden">
                    <button onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <FaTimes/> : <FaBars/>}
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="w-full backdrop-blur-lg lg:hidden">
                    {LINKS.map((link, index) => (
                        <a
                            key={index}
                            href={`#${link.targetId}`}
                            className="block p-4 uppercase tracking-tighter"
                            onClick={(e) => handleScroll(e, link.targetId)}
                        >
                            {link.text}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;