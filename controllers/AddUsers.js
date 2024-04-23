const {Users,Groups,User_Group,sequelize} = require('../models');
//const {Op} = require('sequelize');
exports.addUsers = async (req, res) => {
    
    let transaction;
    try{
        transaction = await sequelize.transaction();
        const groupId = req.params.id;
        const {id,isAdmin} = req.body;
        const existingUser = await User_Group.findOne({where:{GroupId:groupId,UserId:id}});
        if(existingUser){
            return res.status(400).json({message: 'User already added'});
        }
        const addUser = await User_Group.create({GroupId:groupId,UserId:id,isAdmin:isAdmin}, {transaction});
         await transaction.commit();
         res.status(200).json({message: 'Users added successfully', addUser: addUser});

    }catch(error){
        console.log(error);
        if(transaction) await transaction.rollback();
        res.status(500).json({message: error.message});
        
    }
}

exports.searchUsers = async (req, res) => {

    let transaction;
    try{
        transaction = await sequelize.transaction();
        const { userName, email, phoneNumber } = req.body;
        // const whereClause = {
        //     [Op.or]: [
        //         { name: userName },
        //         { email: email },
        //         { phoneNumber: phoneNumber }
        //     ]
        // };
        const users = await Users.findAll({ where: { name: userName }, transaction });
        await transaction.commit();
        res.status(200).json({message: 'Users fetched successfully', users: users});
    }catch(error){
        if(transaction) await transaction.rollback();
        res.status(500).json({message: error.message});
    }
}