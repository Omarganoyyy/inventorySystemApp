import { Link } from "react-router-dom";
import './LoginPage.css'; // Uses the existing aurora styles and input layouts

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
                        <p className="email-title">Email</p>
                        <input type="email" placeholder="Enter your email" />

                        <p className="password-title">Password</p>
                        <input type="password" placeholder="Create a password" />
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