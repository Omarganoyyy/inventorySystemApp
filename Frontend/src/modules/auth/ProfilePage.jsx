import "./ProfilePage.css";
import "./AuthResponsive.css";

export const ProfilePage = () => {
    return (
        <div className="profile-container">
            {/* Aurora Background Layers */}
            <div className="aurora-container">
                <div className="aurora-layer aurora-1"></div>
                <div className="aurora-layer aurora-2"></div>
                <div className="aurora-layer aurora-3"></div>
                <div className="aurora-layer aurora-4"></div>
            </div>

            <div className="profile-card-container">
                <div className="profile-header">
                    <div className="profile-avatar">O</div>
                    <div className="profile-title-group">
                        <h2 className="profile-name">omar gano</h2>
                        <p className="profile-email">omargano@gmail.com</p>
                    </div>
                    <div className="profile-badges">
                        <span className="badge badge-status approved">approved</span>
                    </div>
                </div>

                <hr className="profile-divider" />

                <div className="profile-details-grid">

                    <div className="detail-item">
                        <label className="detail-label">User ID</label>
                        <div className="detail-value value-id">6b00b6944498b279a6930c59</div>
                    </div>

                    <div className="detail-item">
                        <label className="detail-label">Approved By (ID)</label>
                        <div className="detail-value value-id">6afd006d898fcf96051fce68</div>
                    </div>

                    <div className="detail-item">
                        <label className="detail-label">Approved At</label>
                        <div className="detail-value">Nov 20, 2026, 09:08 PM</div>
                    </div>

                    <div className="detail-item">
                        <label className="detail-label">Joined On</label>
                        <div className="detail-value">Nov 20, 2026, 09:07 PM</div>
                    </div>

                    <div className="detail-item">
                        <label className="detail-label">Last Updated</label>
                        <div className="detail-value">Nov 20, 2026, 09:08 PM</div>
                    </div>

                    <div className="detail-item-row">
                        <label className="detail-label">Role</label>
                        <div className="detail-value-value-role">staff</div>
                    </div>

                </div>
            </div>
        </div>
    );
};
