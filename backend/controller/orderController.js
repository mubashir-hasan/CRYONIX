import db from "../config/dbConnection.js";

export const getAllOrders = (req, res) => {
    const query = ` `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: "Server Error !!",
                error: err.message
            });
        } else {
            res.status(200).json({
                status: true,
                message: "Orders Retrieved Successfully !!",
                orders: results
            });
        }
    });
};

