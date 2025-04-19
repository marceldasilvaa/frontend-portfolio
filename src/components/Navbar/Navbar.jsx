import "./Navbar.css";

// links
import { Link, NavLink, useNavigate } from "react-router-dom";

// logo
import logoPortfolio from "../../images/logo-portfolio.png";

// icon
import { BsFillPersonFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";

// components
import Button from "../Button/Button";

// hooks
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// slice
import { logout, reset } from "../../slices/authSlice";

const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");

  const { user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const sidebarRef = useRef(null);
  const burgerRef = useRef(null);
  const inputRef = useRef(null);

  // clean all auth state
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  // listener to resize
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);

      if (newWidth > 600) {
        setIsSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // click outside to close menu
  useEffect(() => {
    const closeSidebar = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target)
      ) {
        setIsSidebarVisible(false);
      }
    };

    document.addEventListener("mousedown", closeSidebar);
    return () => document.removeEventListener("mousedown", closeSidebar);
  }, [isSidebarVisible]);

  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (search) {
      return navigate(`/search?q=${search}`)
    }
  };

  const handleInputBlur = () => {
    if (!search) {
      setIsSearching(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div id="navbar">
      <div className={`container ${user ? "" : "noUser"}`}>
        {user ? (
          <div className="burgerMenu" ref={burgerRef}>
            <GiHamburgerMenu
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              className={`burgerIcon ${isSidebarVisible ? "active" : ""}`}
            />
          </div>
        ) : (
          <></>
        )}
        {user ? (
          <>
            <div className="logo">
              <Link to={"/"}>
                <img src={logoPortfolio} alt="Logo" />
              </Link>
            </div>
            <div
              className={`sidebar ${isSidebarVisible ? "visible" : ""}`}
              ref={sidebarRef}
            >
              <nav>
                <ul>
                  <li>
                    <NavLink to="/" onClick={() => setIsSidebarVisible(false)}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">Sobre mim</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">Contato</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/profile"}>
                      <BsFillPersonFill />
                    </NavLink>
                  </li>
                  <li>
                    <Button
                      children={"Sair"}
                      className={"btn-cancel"}
                      onClick={handleLogout}
                    />
                  </li>
                </ul>
              </nav>
            </div>
            <div className="searchWrapper">
              <div className={`searchIcon ${isSearching ? "hidden" : ""}`}>
                <IoIosSearch onClick={handleSearchClick} />
              </div>

              <div className="searchContainer">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="Pesquisar..."
                    onBlur={handleInputBlur}
                    ref={inputRef}
                    className={`searchInput ${isSearching ? "active" : ""}`}
                  />
                </form>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
