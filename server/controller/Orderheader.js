import OrderHeaderModel from "../model/Orderheader.js"


export const CreateOrderHeader = async (req, res) => {
    try {
        const orderHeaderData = await OrderHeaderModel.create({
            user: req.body.userId,
            name: req.body.name,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode,
            phoneNumber: req.body.phoneNumber,
        });
        if (orderHeaderData) {
            res.status(201).send({ message: "Order Header Created", orderHeaderData });
        } else {
            res.status(404).send({ message: "Order Header Not Created" });
        }
    } catch (error) {
        console.error("Failed to create Order Header:", error);
        res.status(500).send({ message: "Failed to create Order Header" });
    }
};

export const UpdateOrderHeader = async (req, res) => {
    try {
        const orderHeaderData = await OrderHeaderModel.findByIdAndUpdate(
            req.body.id,
            {
                name: req.body.name,
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                state: req.body.state,
                postalCode: req.body.postalCode,
                phoneNumber: req.body.phoneNumber,
            },
            { new: true } 
        );
        if (orderHeaderData) {
            res.status(200).send({ message: "Order Header Updated", orderHeaderData });
        } else {
            res.status(404).send({ message: "Order Header Not Updated" });
        }
    } catch (error) {
        console.error("Failed to update Order Header:", error);
        res.status(500).send({ message: "Failed to update Order Header" });
    }
};

export const DeleteOrderHeader = async (req, res) => {
    try {
        const orderHeaderData = await OrderHeaderModel.deleteOne({ _id: req.body.id });
        if (orderHeaderData.deletedCount === 1) {
            res.status(200).send({ message: "Order Header Deleted" });
        } else {
            res.status(404).send({ message: "Order Header Not Deleted" });
        }
    } catch (error) {
        console.error("Failed to delete Order Header:", error);
        res.status(500).send({ message: "Failed to delete Order Header" });
    }
};

export const GetOrderHeadersByUserId = async (req, res) => {
    try {
        const orderHeaders = await OrderHeaderModel.find({ user: req.query.userId });
        res.status(200).send({ orderHeaders });
    } catch (e) {
        // console.error("Failed to find Order Headers:", error);
        res.status(404).send({error:e?.message});
    }
};
export const GetAllOrderHeaders = async (req, res) => {
    try {
        const orderHeaders = await OrderHeaderModel.find({});
        res.status(200).send({ orderHeaders });
    } catch (error) {
        console.error("Failed to retrieve Order Headers:", error);
        res.status(500).send({ message: "Failed to retrieve Order Headers" });
    }
};
