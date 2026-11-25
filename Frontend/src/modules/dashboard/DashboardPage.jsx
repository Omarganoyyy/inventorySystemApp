import { Link } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PageHeader } from "../../components/PageHeader";
import { StatusBadge } from "../../components/StatusBadge";
import "./Dashboard.css";

const stats = [
    { label: "Total Products", value: "248", detail: "+12 this month", tone: "purple" },
    { label: "Inventory Value", value: "$84,520", detail: "+8.2% this month", tone: "green" },
    { label: "Low Stock", value: "14", detail: "Needs attention", tone: "amber" },
    { label: "Pending Users", value: "6", detail: "Awaiting approval", tone: "red" },
];

const recentProducts = [
    { name: "Wireless Mouse", sku: "PRD-000184", category: "Accessories", stock: 42, price: "$29.99" },
    { name: "USB-C Dock", sku: "PRD-000183", category: "Accessories", stock: 8, price: "$89.00" },
    { name: "Desk Lamp", sku: "PRD-000182", category: "Furniture", stock: 24, price: "$45.50" },
    { name: "Notebook Pack", sku: "PRD-000181", category: "Stationery", stock: 5, price: "$18.25" },
];

const recentMovements = [
    { type: "IN", product: "Wireless Mouse", quantity: "+25", reason: "Supplier delivery", date: "Today, 10:32 AM" },
    { type: "OUT", product: "USB-C Dock", quantity: "-4", reason: "Sales order", date: "Today, 9:15 AM" },
    { type: "IN", product: "Desk Lamp", quantity: "+12", reason: "Warehouse restock", date: "Yesterday" },
];

export const DashboardPage = () => {
    return (
        <AppShell active="/">
            <PageHeader
                title="Inventory Overview"
                subtitle="Monitor stock levels and recent activity"
                action={<Link className="button-link" to="/products/new">+ Add Product</Link>}
            />

            <section className="stats-grid" aria-label="Inventory statistics">
                {stats.map((stat) => (
                    <article className={`stat-card ${stat.tone}`} key={stat.label}>
                        <span className="stat-label">{stat.label}</span>
                        <strong className="stat-value">{stat.value}</strong>
                        <span className="stat-detail">{stat.detail}</span>
                    </article>
                ))}
            </section>

            <section className="dashboard-grid">
                <article className="panel-card recent-products">
                    <div className="panel-header">
                        <div>
                            <h2>Recent Products</h2>
                            <p>Latest inventory entries</p>
                        </div>
                        <Link to="/products">View all</Link>
                    </div>
                    <div className="table-wrap">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentProducts.map((product) => (
                                    <tr key={product.sku}>
                                        <td>
                                            <Link className="table-product" to="/products/PRD-000184">
                                                <span className="product-thumb">{product.name.charAt(0)}</span>
                                                <span>
                                                    <strong>{product.name}</strong>
                                                    <small>{product.sku}</small>
                                                </span>
                                            </Link>
                                        </td>
                                        <td><StatusBadge tone="neutral">{product.category}</StatusBadge></td>
                                        <td>
                                            <span className={product.stock < 10 ? "stock-low" : "stock-ok"}>
                                                {product.stock} units
                                            </span>
                                        </td>
                                        <td><strong>{product.price}</strong></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </article>

                <article className="panel-card movement-list-card">
                    <div className="panel-header">
                        <div>
                            <h2>Recent Movements</h2>
                            <p>Latest stock changes</p>
                        </div>
                        <Link to="/stock-movements">View all</Link>
                    </div>
                    <div className="movement-list">
                        {recentMovements.map((movement, index) => (
                            <div className="movement-row" key={`${movement.product}-${index}`}>
                                <span className={`movement-icon ${movement.type.toLowerCase()}`}>{movement.type}</span>
                                <div className="movement-main">
                                    <strong>{movement.product}</strong>
                                    <span>{movement.reason}</span>
                                </div>
                                <div className="movement-meta">
                                    <strong className={movement.type === "IN" ? "positive" : "negative"}>
                                        {movement.quantity}
                                    </strong>
                                    <span>{movement.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </AppShell>
    );
};
