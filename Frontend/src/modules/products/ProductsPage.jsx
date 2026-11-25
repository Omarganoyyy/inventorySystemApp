import { Link } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PageHeader } from "../../components/PageHeader";
import { StatusBadge } from "../../components/StatusBadge";
import "./Products.css";

const products = [
    { id: "PRD-000184", name: "Wireless Mouse", category: "Accessories", price: "$29.99", stock: 42, available: true },
    { id: "PRD-000183", name: "USB-C Dock", category: "Accessories", price: "$89.00", stock: 8, available: true },
    { id: "PRD-000182", name: "Desk Lamp", category: "Furniture", price: "$45.50", stock: 24, available: true },
    { id: "PRD-000181", name: "Notebook Pack", category: "Stationery", price: "$18.25", stock: 5, available: true },
    { id: "PRD-000180", name: "Mechanical Keyboard", category: "Accessories", price: "$119.00", stock: 16, available: true },
    { id: "PRD-000179", name: "Monitor Arm", category: "Furniture", price: "$72.99", stock: 0, available: false },
];

export const ProductsPage = () => {
    return (
        <AppShell active="/products">
            <PageHeader
                title="Products"
                subtitle="Browse, create, edit and manage inventory"
                action={<Link className="button-link" to="/products/new">+ Add Product</Link>}
            />

            <section className="content-panel">
                <div className="toolbar">
                    <label className="search-field">
                        <span>Search</span>
                        <input type="search" placeholder="Search products..." />
                    </label>
                    <label className="select-field">
                        <span>Category</span>
                        <select defaultValue="all">
                            <option value="all">All categories</option>
                            <option value="accessories">Accessories</option>
                            <option value="furniture">Furniture</option>
                            <option value="stationery">Stationery</option>
                        </select>
                    </label>
                </div>

                <div className="table-wrap">
                    <table className="data-table product-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th className="actions-heading">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <Link className="table-product" to={`/products/${product.id}`}>
                                            <span className="product-thumb">{product.name.charAt(0)}</span>
                                            <span><strong>{product.name}</strong><small>{product.id}</small></span>
                                        </Link>
                                    </td>
                                    <td><StatusBadge tone="neutral">{product.category}</StatusBadge></td>
                                    <td><span className={product.stock < 10 ? "stock-low" : "stock-ok"}>{product.stock} units</span></td>
                                    <td><strong>{product.price}</strong></td>
                                    <td><StatusBadge tone={product.available ? "approved" : "rejected"}>{product.available ? "Available" : "Unavailable"}</StatusBadge></td>
                                    <td>
                                        <div className="row-actions">
                                            <Link className="icon-button" to={`/products/${product.id}`} aria-label={`View ${product.name}`} title="View">View</Link>
                                            <Link className="icon-button" to={`/products/${product.id}/edit`} aria-label={`Edit ${product.name}`} title="Edit">Edit</Link>
                                            <button className="icon-button danger" type="button" aria-label={`Delete ${product.name}`} title="Delete">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="table-footer">
                    <span>Showing 1–6 of 248 products</span>
                    <div className="pagination" aria-label="Pagination">
                        <button type="button" className="page-button" disabled>‹</button>
                        <button type="button" className="page-button active">1</button>
                        <button type="button" className="page-button">2</button>
                        <button type="button" className="page-button">3</button>
                        <button type="button" className="page-button">›</button>
                    </div>
                </div>
            </section>
        </AppShell>
    );
};
