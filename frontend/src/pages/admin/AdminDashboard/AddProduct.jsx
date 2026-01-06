import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddProduct.css";

function AddProduct() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [productData, setProductData] = useState({
        name: "",
        price: "",
        description: "",
        stock: "",
        sku: ""
    });

    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            if (!image) {
                toast.error("Please select an image");
                setLoading(false);
                return;
            }
            const token = localStorage.getItem("accessToken");
            
            const imageForm = new FormData();
            imageForm.append("productImage", image);

            const imageRes = await fetch(
                "http://localhost:5000/api/products/addImage",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: imageForm
                }
            );

            if (!imageRes.ok) {
                throw new Error("Image upload failed");
            }

            const imageData = await imageRes.json();
            const imageUrl = imageData.imageUrl;

        
            const productRes = await fetch(
                "http://localhost:5000/api/products/add_product",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...productData,
                        imageUrl
                    })
                }
            );

            const productDataRes = await productRes.json();

            if (!productRes.ok) {
                throw new Error(productDataRes.message || "Product creation failed");
            }

            toast.success("Product added successfully 🎉");
            navigate("/admin/dashboard");


        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8 col-xl-7">
                    {/* Header */}
                    <div className="mb-4">
                        <button
                            className="btn btn-outline-secondary mb-3"
                            onClick={() => navigate('/admin/products')}
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Products
                        </button>
                        <h2 className="admin-page-title mb-2">Add New Product</h2>
                        <p className="text-muted">Fill in the product details below</p>
                    </div>

                    {/* Alert Messages */}
                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            {error}
                            <button type="button" className="btn-close" onClick={() => setError('')}></button>
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <i className="bi bi-check-circle me-2"></i>
                            {success}
                            <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                        </div>
                    )}

                    {/* Form Card */}
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    {/* Product Name */}
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">
                                            Product Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="name"
                                            placeholder="Enter product name"
                                            value={productData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Price and Stock */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Price (Rs) <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group input-group-lg">
                                            <span className="input-group-text">Rs</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="price"
                                                placeholder="0.00"
                                                value={productData.price}
                                                onChange={handleChange}
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Stock Quantity
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control form-control-lg"
                                            name="stock"
                                            placeholder="0"
                                            value={productData.stock}
                                            onChange={handleChange}
                                            min="0"
                                        />
                                    </div>

                                    {/* SKU */}
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">
                                            SKU (Stock Keeping Unit)
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="sku"
                                            placeholder="e.g., PRD-001"
                                            value={productData.sku}
                                            onChange={handleChange}
                                        />
                                        <div className="form-text">Unique identifier for inventory management</div>
                                    </div>

                                    {/* Product Image */}
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">
                                            Product Image <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control form-control-lg"
                                            accept="image/*"
                                            onChange={(e) => setImage(e.target.files[0])}
                                            required
                                        />
                                        <div className="form-text">Supported formats: JPG, PNG, GIF (Max 5MB)</div>

                                        {/* Image Preview */}
                                        {image && (
                                            <div className="mt-3">
                                                <p className="mb-2 fw-semibold">Preview:</p>
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt="Preview"
                                                    className="img-thumbnail"
                                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">
                                            Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows="4"
                                            placeholder="Enter product description..."
                                            value={productData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                        <div className="form-text">
                                            {productData.description.length} characters
                                        </div>
                                    </div>

                                    {/* Submit Buttons */}
                                    <div className="col-12 mt-4">
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button
                                                type="button"
                                                className="btn btn-secondary btn-lg"
                                                onClick={() => navigate('/admin/dashboard')}
                                                disabled={loading}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-lg px-5"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-check-circle me-2"></i>
                                                        Save Product
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Help Text */}
                    <div className="mt-3">
                        <small className="text-muted">
                            <i className="bi bi-info-circle me-1"></i>
                            All fields marked with <span className="text-danger">*</span> are required
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
