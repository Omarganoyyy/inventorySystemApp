import { Link } from "react-router-dom";
import './LoginPage.css';
import './AuthResponsive.css';

export const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="aurora-container">
                <div className="aurora-layer aurora-1"></div>
                <div className="aurora-layer aurora-2"></div>
                <div className="aurora-layer aurora-3"></div>
                <div className="aurora-layer aurora-4"></div>
            </div>

            <div className="login-card-container">
                <div className="right-login-container">
                    <h2 className="login-title">Welcome Back</h2>

                    <div className="login-inputs">
                        <label className="auth-field">
                            <span className="email-title">Email</span>
                            <input type="email" autoComplete="email" placeholder="Enter your email" />
                        </label>

                        <label className="auth-field">
                            <span className="password-title">Password</span>
                            <input type="password" autoComplete="current-password" placeholder="Enter your password" />
                        </label>
                    </div>

                    <div className="button-container">
                        <Link to="/login">Login</Link>
                    </div>

                    <div className="switch-container">
                        <span className="switch-text">Don't have an account?</span>
                        <Link to="/signup" className="switch-link">Sign Up</Link>
                    </div>
                </div>

                <div className="left-login-container">
                    <img
                        src="/Finance icons set_ Banking, investments, trendy plastics bank icons.jpg"
                        alt="Finance Icons"
                    />
                </div>
            </div>
        </div>
    );
};
