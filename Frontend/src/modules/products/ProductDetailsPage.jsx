import { Link } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { StatusBadge } from "../../components/StatusBadge";
import "./Products.css";

export const ProductDetailsPage = () => {
    return (
        <AppShell active="/products">
            <div className="details-header">
                <div>
                    <Link className="back-link" to="/products">‹ Back to products</Link>
                    <h1>Wireless Mouse</h1>
                </div>
                <div className="details-actions">
                    <Link className="button-link secondary" to="/products/PRD-000184/edit">Edit</Link>
                    <button className="button danger" type="button">Delete</button>
                </div>
            </div>

            <section className="details-grid">
                <article className="content-panel product-detail-main">
                    <div className="detail-product-header">
                        <div className="detail-image">WM</div>
                        <div>
                            <StatusBadge tone="approved">Available</StatusBadge>
                            <h2>Wireless Mouse</h2>
                            <p>PRD-000184</p>
                        </div>
                    </div>
                    <div className="detail-description">
                        <h3>Description</h3>
                        <p>A compact wireless mouse with reliable 2.4 GHz connectivity and a quiet, responsive click design.</p>
                    </div>
                    <div className="detail-fields">
                        <div><span>Price</span><strong>$29.99</strong></div>
                        <div><span>Category</span><strong>Accessories</strong></div>
                        <div><span>Stock</span><strong className="stock-ok">42 units</strong></div>
                        <div><span>Created by</span><strong>omar gano</strong></div>
                        <div><span>Created on</span><strong>Nov 20, 2026</strong></div>
                        <div><span>Last updated</span><strong>Nov 25, 2026</strong></div>
                    </div>
                </article>

                <aside className="content-panel stock-panel">
                    <h2>Stock Adjustment</h2>
                    <p>Record incoming or outgoing inventory.</p>
                    <label className="form-field">
                        <span>Adjustment type</span>
                        <select defaultValue="IN"><option value="IN">Increase stock</option><option value="OUT">Decrease stock</option></select>
                    </label>
                    <label className="form-field">
                        <span>Quantity</span>
                        <input type="number" min="1" step="1" placeholder="Enter quantity" />
                    </label>
                    <label className="form-field">
                        <span>Reason</span>
                        <input type="text" placeholder="Reason for adjustment" />
                    </label>
                    <button className="button full-button" type="button">Adjust Stock</button>
                </aside>
            </section>
        </AppShell>
    );
};
