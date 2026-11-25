import { AppShell } from "../../components/AppShell";
import { PageHeader } from "../../components/PageHeader";
import { StatusBadge } from "../../components/StatusBadge";
import "./Approval.css";

const pendingUsers = [
    { id: "64a8f12bc91e33d1a1c00421", name: "Sarah Ahmed", email: "sarah.ahmed@example.com", joined: "Nov 25, 2026, 10:12 AM", role: "staff" },
    { id: "64a8f12bc91e33d1a1c00422", name: "Daniel Lee", email: "daniel.lee@example.com", joined: "Nov 24, 2026, 4:44 PM", role: "staff" },
    { id: "64a8f12bc91e33d1a1c00423", name: "Maya Hassan", email: "maya.hassan@example.com", joined: "Nov 23, 2026, 11:08 AM", role: "staff" },
];

export const PendingUsersPage = () => {
    return (
        <AppShell active="/pending-users">
            <PageHeader
                title="Pending Users"
                subtitle="Review staff registration requests"
            />

            <section className="approval-grid">
                {pendingUsers.map((user) => (
                    <article className="approval-card" key={user.id}>
                        <div className="approval-card-header">
                            <div className="approval-avatar">{user.name.charAt(0)}</div>
                            <div>
                                <h2>{user.name}</h2>
                                <p>{user.email}</p>
                            </div>
                            <StatusBadge tone="pending">Pending</StatusBadge>
                        </div>
                        <div className="approval-details">
                            <div><span>User ID</span><strong className="value-id">{user.id}</strong></div>
                            <div><span>Role</span><strong>{user.role}</strong></div>
                            <div><span>Requested</span><strong>{user.joined}</strong></div>
                        </div>
                        <div className="approval-actions">
                            <button type="button" className="button secondary">Reject</button>
                            <button type="button" className="button">Approve</button>
                        </div>
                    </article>
                ))}
            </section>
        </AppShell>
    );
};
