import "./ConfirmationModal.css";

export const ConfirmationModal = ({
    title = "Confirm action",
    description = "Are you sure you want to continue?",
    confirmLabel = "Confirm",
    danger = false,
}) => {
    return (
        <div className="confirm-modal" role="dialog" aria-modal="true" aria-label={title}>
            <div className="confirm-card">
                <span className="confirm-icon">{danger ? "!" : "?"}</span>
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="confirm-actions">
                    <button type="button" className="button secondary">Cancel</button>
                    <button type="button" className={`button ${danger ? "danger" : ""}`}>{confirmLabel}</button>
                </div>
            </div>
        </div>
    );
};
