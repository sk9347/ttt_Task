const User = require('../models/userModule')

const createUser = async (userData) => { 
    try {
        const { userName, password, email } = userData;
        const user = new User({ userName, password, email });
        return await user.save(); 
    } catch (err) {
        return err; 
    }
}

const getUsers= async()=>{
    try{
        return await User.find()
    }
    catch(err){
        return err
    }
}


const updateUserById = async (userId, updateData) => {
    try {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (err) {
        return err;
    }

};

const deleteUserById = async (userId) => {
    try {
        return await User.findByIdAndDelete(userId);
    } catch (err) {
        return err;
    }
};




module.exports = { createUser ,getUsers,updateUserById,deleteUserById };
