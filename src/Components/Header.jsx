import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/ring_builder/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); 
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
        isHome
          ? scrolled
            ? "bg-white shadow-md"
            : "bg-transparent"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-md shadow-yellow-500/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-6 h-6 text-black"
            >
              <path d="M12 3l3.09 6.26 6.91.99-5 4.87 1.18 6.88L12 17.77l-6.18 3.23L7 15.12 2 10.25l6.91-.99L12 3z" />
            </svg>
          </div>
          <span
            className={`text-2xl font-serif tracking-widest ${
              isHome && !scrolled ? "text-yellow-500" : "text-yellow-600"
            }`}
          >
            Ring Builder
          </span>
        </motion.div>

        {/* Menu */}
        <nav className="hidden md:flex space-x-10">
          {["Home", "Collections", "Ring Builder", "About", "Contact"].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/`}
                className={`relative group text-sm uppercase tracking-[0.2em] font-medium ${
                  isHome && !scrolled ? "text-white" : "text-black"
                } hover:text-yellow-400`}
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 
          text-black px-6 py-2 rounded-full font-semibold shadow-md shadow-yellow-500/30"
        >
          Build Now
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
