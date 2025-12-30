import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const chargePayment = async (req, res) => {
    const { price } = req.body;

    try {
        const data = await stripe.paymentIntents.create({
            amount: price * 100,  
            currency: "usd",
            payment_method_types: ["card"]
        });

        res.json({
            status: true,
            message: "Payment Created",
            client_secret: data.client_secret,   
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: false,
            message: "Payment Failed",
            error: error.message
        });
    }
};
