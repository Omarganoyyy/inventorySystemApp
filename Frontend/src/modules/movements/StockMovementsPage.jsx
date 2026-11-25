import { Link } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PageHeader } from "../../components/PageHeader";
import { StatusBadge } from "../../components/StatusBadge";
import "./Movements.css";

const movements = [
    { id: "MOV-1048", product: "Wireless Mouse", sku: "PRD-000184", type: "IN", quantity: 25, before: 17, after: 42, reason: "Supplier delivery", user: "omar gano", date: "Nov 25, 2026 10:32 AM" },
    { id: "MOV-1047", product: "USB-C Dock", sku: "PRD-000183", type: "OUT", quantity: 4, before: 12, after: 8, reason: "Sales order", user: "omar gano", date: "Nov 25, 2026 9:15 AM" },
    { id: "MOV-1046", product: "Desk Lamp", sku: "PRD-000182", type: "IN", quantity: 12, before: 12, after: 24, reason: "Warehouse restock", user: "omar gano", date: "Nov 24, 2026 3:48 PM" },
    { id: "MOV-1045", product: "Notebook Pack", sku: "PRD-000181", type: "OUT", quantity: 10, before: 15, after: 5, reason: "Office request", user: "omar gano", date: "Nov 24, 2026 12:20 PM" },
    { id: "MOV-1044", product: "Mechanical Keyboard", sku: "PRD-000180", type: "ADJUST", quantity: 16, before: 14, after: 16, reason: "Manual count", user: "omar gano", date: "Nov 23, 2026 2:10 PM" },
];

export const StockMovementsPage = () => {
    return (
        <AppShell active="/stock-movements">
            <PageHeader
                title="Stock Movements"
                subtitle="Review and track all inventory adjustments"
                action={<Link className="button-link" to="/products">Adjust Stock</Link>}
            />

            <section className="movement-summary">
                <article><span>Stock in</span><strong className="positive">+37 units</strong></article>
                <article><span>Stock out</span><strong className="negative">-14 units</strong></article>
                <article><span>Manual adjustments</span><strong>5 records</strong></article>
            </section>

            <section className="content-panel">
                <div className="movement-toolbar">
                    <div className="filter-tabs" aria-label="Movement filters">
                        <button type="button" className="active">All</button>
                        <button type="button">Stock in</button>
                        <button type="button">Stock out</button>
                        <button type="button">Adjust</button>
                    </div>
                </div>
                <div className="table-wrap">
                    <table className="data-table movement-table">
                        <thead>
                            <tr>
                                <th>Movement</th>
                                <th>Product</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Before</th>
                                <th>After</th>
                                <th>Reason</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movements.map((movement) => (
                                <tr key={movement.id}>
                                    <td><strong>{movement.id}</strong></td>
                                    <td>
                                        <Link className="table-product" to={`/products/${movement.sku}`}>
                                            <span className="product-thumb">{movement.product.charAt(0)}</span>
                                            <span><strong>{movement.product}</strong><small>{movement.sku}</small></span>
                                        </Link>
                                    </td>
                                    <td><StatusBadge tone={movement.type === "IN" ? "in" : movement.type === "OUT" ? "out" : "neutral"}>{movement.type}</StatusBadge></td>
                                    <td><strong className={movement.type === "IN" ? "positive" : movement.type === "OUT" ? "negative" : ""}>{movement.type === "IN" ? "+" : movement.type === "OUT" ? "-" : ""}{movement.quantity}</strong></td>
                                    <td>{movement.before}</td>
                                    <td><strong>{movement.after}</strong></td>
                                    <td>{movement.reason}</td>
                                    <td><span className="date-cell">{movement.date}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="table-footer">
                    <span>Showing 1–5 movements</span>
                    <div className="pagination">
                        <button type="button" className="page-button" disabled>‹</button>
                        <button type="button" className="page-button active">1</button>
                        <button type="button" className="page-button">2</button>
                        <button type="button" className="page-button">›</button>
                    </div>
                </div>
            </section>
        </AppShell>
    );
};
