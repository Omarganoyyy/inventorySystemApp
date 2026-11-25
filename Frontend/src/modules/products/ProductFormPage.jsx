import { Link } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { PageHeader } from "../../components/PageHeader";
import "./Products.css";

export const ProductFormPage = ({ mode = "create" }) => {
    const editing = mode === "edit";

    return (
        <AppShell active="/products">
            <PageHeader
                title={editing ? "Edit Product" : "Create Product"}
                subtitle={editing ? "Update inventory and product information" : "Add a new item to your inventory"}
            />

            <section className="form-layout">
                <div className="content-panel form-card">
                    <h2>Product information</h2>
                    <form className="product-form">
                        <label className="form-field">
                            <span>Product name</span>
                            <input type="text" defaultValue={editing ? "Wireless Mouse" : ""} placeholder="Enter product name" />
                        </label>
                        <label className="form-field">
                            <span>Category</span>
                            <input type="text" defaultValue={editing ? "Accessories" : ""} placeholder="e.g. Accessories" />
                        </label>
                        <label className="form-field">
                            <span>Price</span>
                            <input type="number" min="0" step="0.01" defaultValue={editing ? "29.99" : ""} placeholder="0.00" />
                        </label>
                        {!editing && (
                            <label className="form-field">
                                <span>Initial stock</span>
                                <input type="number" min="0" step="1" defaultValue="" placeholder="0" />
                            </label>
                        )}
                        {editing && (
                            <label className="form-field">
                                <span>Note</span>
                                <input type="text" placeholder="Optional update note" />
                            </label>
                        )}
                        <label className="form-field full">
                            <span>Description</span>
                            <textarea rows="5" defaultValue={editing ? "A compact wireless mouse for everyday use." : ""} placeholder="Describe this product"></textarea>
                        </label>
                        <div className="form-actions full">
                            <Link className="button-link secondary" to="/products">Cancel</Link>
                            <button className="button" type="button">{editing ? "Save Changes" : "Create Product"}</button>
                        </div>
                    </form>
                </div>

                <aside className="content-panel preview-card">
                    <h2>Preview</h2>
                    <div className="product-preview">
                        <div className="preview-image">WM</div>
                        <span className="preview-sku">PRD-000184</span>
                        <h3>{editing ? "Wireless Mouse" : "Product name"}</h3>
                        <p>{editing ? "A compact wireless mouse for everyday use." : "Your product description will appear here."}</p>
                        <div className="preview-meta">
                            <span><small>Price</small><strong>{editing ? "$29.99" : "$0.00"}</strong></span>
                            <span><small>Stock</small><strong>{editing ? "42 units" : "0 units"}</strong></span>
                        </div>
                    </div>
                </aside>
            </section>
        </AppShell>
    );
};
