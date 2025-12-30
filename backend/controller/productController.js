import db from '../config/dbConnection.js'


export const getAllProducts = (req, res)=>{
    const query = "SELECT * FROM products";

    db.query(query, (err, result)=>{

        if (err){
            res.json({
            status:false,
            message:"Something Went Wrong",
        });
        }else{
            res.json({
                status:true,
                message:"All Products",
                products:result,
            });    
        }
        
    });
}

export const addProducts = (req, res)=>{
    const {name, price, description, stock, sku, imageUrl} = req.body;
    const query = 'INSERT INTO products (name, price, description, stock, sku, image_url, created_at) VALUE ( ?, ?, ?, ?, ?, ?, NOW())'
    db.query(query, [name, price, description, stock, sku, imageUrl], (err, result) => { 
        if(err){
            res.status(500).json({
                status:false,
                message:"Server Error !!!"
            })
        }else{
            res.json({
                status:true,
                message:"Product Added !!!" 
            })
        }
     })
};

export const updateImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "No image uploaded"
            });
        }

        // Create image URL
        const imageUrl = `uploads/products/${req.file.filename}`;

        // Send response
        res.status(200).json({
            status: true,
            message: "Image uploaded successfully",
            imageUrl: imageUrl
        });

    } catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({
            status: false,
            message: "Server error while uploading image"
        });
    }
};


export const getSingleProduct = (req, res) => {
    const { id } = req.params;

    const query = "SELECT * FROM products WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(result[0]);
    });
};
 