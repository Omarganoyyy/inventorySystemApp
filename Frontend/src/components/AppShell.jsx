import { Link } from "react-router-dom";
import "./AppShell.css";

const navItems = [
    { to: "/", label: "Overview", icon: "O" },
    { to: "/products", label: "Products", icon: "P" },
    { to: "/stock-movements", label: "Stock Movements", icon: "S" },
    { to: "/pending-users", label: "Pending Users", icon: "U" },
];

export const AppShell = ({ children, active = "/" }) => {
    return (
        <div className="app-shell">
            <div className="aurora-container" aria-hidden="true">
                <div className="aurora-layer aurora-1"></div>
                <div className="aurora-layer aurora-2"></div>
                <div className="aurora-layer aurora-3"></div>
                <div className="aurora-layer aurora-4"></div>
            </div>

            <aside className="app-sidebar">
                <Link to="/" className="brand">
                    <span className="brand-mark">I</span>
                    <span>Inventra</span>
                </Link>

                <nav className="side-nav" aria-label="Main navigation">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`nav-item ${active === item.to ? "active" : ""}`}
                            aria-current={active === item.to ? "page" : undefined}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-profile">
                    <div className="profile-avatar-small">O</div>
                    <div>
                        <strong>omar gano</strong>
                        <span>Administrator</span>
                    </div>
                </div>
            </aside>

            <main className="app-main">
                <header className="topbar">
                    <Link to="/profile" className="topbar-profile" aria-label="Open profile">
                        <span className="topbar-avatar">O</span>
                        <span className="topbar-name">omar gano</span>
                    </Link>
                </header>
                <div className="app-content">{children}</div>
            </main>
        </div>
    );
};
