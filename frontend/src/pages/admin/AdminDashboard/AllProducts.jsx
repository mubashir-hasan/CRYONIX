import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllProducts.css';


   


function AllProducts() {


    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    try {
        useEffect(()=>{
            fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                if(data.status){
                    setProducts(data.products);
                    setLoading(false);
                }
            } )

        }, []);

        if(loading){
            return(
                <h2>Loading ...</h2>
            )
        }

        


    } catch (error) {

        console.log('Something Went Wrong')
        
    }
    const addProduct = ()=>{
        navigate('/admin/add-product', {replace:true})
    }



  return (
    <div className='container'>
        <div className='d-flex align-items-center justify-content-between  m-3'>
            <div>All Products</div>
            <button className='btn btn-primary ' onClick={addProduct}>Add New Product</button>
        </div>
        <div className='table-responsive'>
            <table className='table table-bordered align-middle table-striped table-hover mt-4'>
                <thead className='table table-success'>
                    <tr className=''>
                        <th className='text-center'>Id</th>
                        <th className='text-center'>Image</th>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Stock</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </ thead>
                <tbody>
                    {
                    products.map((product)=>(

                        <tr key={product.id} className=''>
                            <td className="ps-4 fw-medium text-center">{product.id}</td>
                            <td className='text-center img-container' ><img src={`http://localhost:5000/${product.image_url}`} alt="Loading" className='img-fluid img-thumnail img-table mx-auto d-block rounded' /></td>
                            <td className='text-center'>{product.name}</td>
                            <td className="text-success fw-bold text-center">Rs. {product.price}
                            </td>
                            <td className='text-center'>
                            <span
                                className={`badge rounded ${
                                product.stock > 0 ? "bg-success" : "bg-danger"
                                }`}
                            >
                                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                            </span>
                            </td>
                            <td className="text-center ">
                            <button className="btn btn-sm btn-outline-primary me-4">
                                Edit
                            </button>
                            <button className="btn btn-sm btn-danger ">
                                Delete
                            </button>
                            </td>
                        </tr>
                        
                    ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AllProducts;