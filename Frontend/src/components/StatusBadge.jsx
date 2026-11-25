export const StatusBadge = ({ tone = "neutral", children }) => {
    return <span className={`status-badge ${tone}`}>{children}</span>;
};
