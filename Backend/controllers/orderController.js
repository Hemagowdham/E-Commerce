const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")


//Create Order API - /api/v1/order
exports.createOrder = async(req, res, next) => {
    //For testing post json data
    //console.log(req.body, 'DATA');

    const cartItems = req.body;
    const amount = Number(cartItems.reduce((acc, item)=>(acc+ item.product.price * item.qty), 0)).toFixed(2);
    const status = 'pending';

    const order = await orderModel.create({cartItems, amount, status});

    //Updating Product stock - Stock value updation after placing order
    cartItems.forEach(async(item) => {
        const product = await productModel.findById(item.product._id);
        product.stock = Number(product.stock - item.quantity);
        await product.save();
    });

    //console.log('CART AMOUNT: ', amount);
    //orderModel.create()
    res.json(
        {
            success: true,
            order
            //message: 'Order works!'
        }
    )
}
