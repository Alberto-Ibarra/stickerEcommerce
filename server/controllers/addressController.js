const Address = require('../models/Address');

const createAddress = async (req, res) => {
    try {
        const {street, unit, city, state, postalCode} = req.body;

        const userId = req.user.user_id;
        if(!userId){
            return res.status(400).json({message: "User Id is required"})
        }

        const address = await Address.create({
            user: userId,
            street,
            unit,
            city,
            state,
            postalCode
        });
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({message: "Address entry failed", error});
    }
}

const updateAddress = async (req, res) => {
    try {
        console.log("update address");
    } catch (error) {
        res.status(500).json({message: "Address update failed", error})
    }
}

const deleteAddress = async (req, res) => {
    try {
        console.log("delete address");
    } catch (error) {
        res.status(500).json({message: "Address update failed", error})
    }
}

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress
}