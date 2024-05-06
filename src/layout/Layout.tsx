import { Outlet, Link } from "react-router-dom";
import { MapIcon, TruckIcon, UserIcon } from "../components/Icons";
import { useState } from "react";

const Layout: React.FC<any> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Toggle Button for Sidebar */}
        <button
          className="btn btn-primary d-md-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          Menu
        </button>

        {/* Sidebar */}
        <nav
          className={`col-md-1 col-lg-1 d-md-block bg-light sidebar collapse ${
            isOpen ? "show" : ""
          }`}
          style={{ minHeight: "100vh" }}
        >
          <div className="d-flex flex-column justify-content-center vh-100">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <p>
                    Viajes <MapIcon />
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/operators">
                  <p>
                    Operadores <UserIcon />
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/vehicles">
                  <p>
                    Vehicles <TruckIcon />
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/routes">
                  <p>
                    Rutas <TruckIcon />
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main
          className="col-md-11 col-lg-11 ms-sm-auto px-md-4"
          style={{ minHeight: "100vh" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
