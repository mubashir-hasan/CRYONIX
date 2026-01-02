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
        <div className="new-product-container mx-auto">
            <div className="p-5 border rounded shadow my-5">
                <h2 className="text-center my-4">Add New Product</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price (Rs)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            name="stock"
                            value={productData.stock}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">SKU</label>
                        <input
                            type="text"
                            className="form-control"
                            name="sku"
                            value={productData.sku}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Product Image</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            rows="3"
                            value={productData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button className="btn btn-warning w-100" disabled={loading}>
                        {loading ? "Saving..." : "Save Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
