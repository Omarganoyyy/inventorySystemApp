import { Link } from "react-router-dom";
import './LoginPage.css'; // Uses the existing aurora styles and input layouts
import './AuthResponsive.css';

export const SignUpPage = () => {
    return (
        <div className="login-container">
            <div className="aurora-container">
                <div className="aurora-layer aurora-1"></div>
                <div className="aurora-layer aurora-2"></div>
                <div className="aurora-layer aurora-3"></div>
                <div className="aurora-layer aurora-4"></div>
            </div>

            <div className="login-card-container">
                <div className="left-login-container">
                    <img
                        src="/Finance icons set_ Banking, investments, trendy plastics bank icons.jpg"
                        alt="Finance Icons"
                    />
                </div>

                <div className="right-login-container">
                    <h2 className="login-title">Create Account</h2>

                    <div className="login-inputs">
                        <label className="auth-field">
                            <span className="email-title">Name</span>
                            <input type="text" autoComplete="name" placeholder="Enter your full name" />
                        </label>

                        <label className="auth-field">
                            <span className="email-title">Email</span>
                            <input type="email" autoComplete="email" placeholder="Enter your email" />
                        </label>

                        <label className="auth-field">
                            <span className="password-title">Password</span>
                            <input type="password" autoComplete="new-password" placeholder="Create a password" />
                        </label>
                    </div>

                    <div className="button-container">
                        <Link to="/signup">Sign Up</Link>
                    </div>

                    {/* Switch to Login */}
                    <div className="switch-container">
                        <span className="switch-text">Already have an account?</span>
                        <Link to="/login" className="switch-link">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
