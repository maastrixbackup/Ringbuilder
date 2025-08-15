import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome =
    location.pathname === "/" || location.pathname === "/ring_builder/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { title: "Home", link: "/" },
    { title: "Collections", isMega: true },
    { title: "Ring Builder", isMega: true },
    { title: "About", link: "/" },
    { title: "Contact", link: "/" },
  ];
  const [activeMega, setActiveMega] = useState(null);

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
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
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

        <nav className="hidden md:flex space-x-10 relative">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => item.isMega && setActiveMega(item.title)}
              onMouseLeave={() => item.isMega && setActiveMega(null)}
            >
              <Link
                to={item.link}
                className={`relative text-sm uppercase tracking-[0.2em] font-medium ${
                  isHome && !scrolled ? "text-white" : "text-black"
                } hover:text-yellow-400`}
              >
                {item.title}
              </Link>

              {item.isMega && activeMega === item.title && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="fixed top-13 left-0 w-screen h-[calc(100vh-5rem)] bg-white z-50 shadow-lg"
                >
                  <div className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-4 gap-10">
                    <div>
                      <h4 className="font-semibold mb-4 text-xl">
                        Rings by Type
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Engagement Rings
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Wedding Rings
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Anniversary Rings
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Stackable Rings
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Engagement Rings
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Wedding Rings
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Anniversary Rings
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Stackable Rings
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4 text-xl">
                        Rings by Metal
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Gold
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            White Gold
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Platinum
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Rose Gold
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4 text-xl">
                        Collections
                      </h4>
                      <ul className="space-y-3">
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Halo
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Solitaire
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Vintage
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="hover:text-yellow-500">
                            Modern
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                      <img
                        src="https://ion.jamesallen.com/images/amazingHomepage/rings/Halo-Women-Engagement-Ring.png"
                        alt="Featured Ring"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Sparkle Effect */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div
                          className="absolute w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.6)_0%,transparent_70%)] 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"
                        ></div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6">
                        <Link
                          to="/"
                          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-3 
                         rounded-full shadow-lg font-medium tracking-wide hover:from-yellow-500 
                         hover:to-yellow-700 transition-colors"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-full font-semibold shadow-md shadow-yellow-500/30"
          onClick={() => navigate("/rings")}
        >
          Build Now
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
