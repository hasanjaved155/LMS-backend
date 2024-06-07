import express from "express";
import CartModel from "../models/CartModel.js";
import userPCSModel from "../models/userPCSModel.js";
const router = express.Router();



router.post('/create-cart/:_id', async (req, res) => {
    try {
        const { name, link, image } = req.body;
        const { _id } = req.params;

        if (!name) {
            return res.status(400).send({ message: "Name is required" });
        }
        if (!link) {
            return res.status(400).send({ message: "Link is required" });
        }
        if (!image) {
            return res.status(400).send({ message: "Image is required" });
        }

        const user = await userPCSModel.findById(_id).populate("cart");
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const cart = user.cart.find(cartItem => cartItem.link === link);

        if (cart) {
            // If cart item already exists, increase quantity
            // cart.quantity += 1;
            // await cart.save();
            return res.status(200).send({
                success: false,
                message: "Course Already Exist In Cart",
                cart
            });
        } else {
            // If cart item doesn't exist, create new cart item
            const newCart = new CartModel({ name, link, image });
            await newCart.save();
            user.cart.push(newCart);
            await user.save();
            res.status(201).send({
                success: true,
                message: "Cart Selected Successfully",
                cart: newCart,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while creating cart",
            error: error.message,
        });
    }
}
)
router.get('/get-cart/:_id', async (req, res) => {
    const { _id } = req.params;

    try {
        const user = await userPCSModel.findById(_id).populate("cart");
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const cart = user.cart;
        // console.log(details);

        res.status(200).send({
            success: true,
            message: "Fetched Details successfully",
            cart,
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Error fetching Details" });
    }
});

router.delete('/:_id/delete-cart/:cart_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const { cart_id } = req.params;

        // Find the cart item by its ID
        const cart = await CartModel.findById(cart_id);

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        // Decrease the quantity of the item by 1
        // if (cart.quantity > 1) {
        //     cart.quantity -= 1;
        //     await cart.save();
        // } else {
        //     // If the quantity is 1, remove the item from the cart
        //     await CartModel.findByIdAndDelete(cart_id);

        //     // Remove the cart ID from the user's cart array
        //     await userPCSModel.findByIdAndUpdate(_id,
        //         { $pull: { cart: cart_id } },
        //         { new: true }
        //     );
        // }
        await CartModel.findByIdAndDelete(cart_id);

        // Remove the cart ID from the user's cart array
        await userPCSModel.findByIdAndUpdate(_id,
            { $pull: { cart: cart_id } },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Cart Deleted Successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error while deleting",
            error: error.message,
        });
    }
});

router.put('/update-cart/:cartItemId', async (req, res) => {

    const { cartItemId } = req.params;
    //const { quantity } = req.body;

    try {
        // Find the cart item by ID
        const cartItem = await CartModel.findById(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Update the quantity of the cart item
        // cartItem.quantity = quantity;
        // const qty = cartItem.quantity;
        cartItem.quantity += 1;
        await cartItem.save();

        res.status(200).send({
            success: true,
            message: "Quantity increased successfully",
            cartItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




export default router;