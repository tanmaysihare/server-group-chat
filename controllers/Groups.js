const {Groups,Users,User_Group,sequelize} = require("../models");
exports.createGroup = async (req, res) => {
    let transaction;
    try{
        transaction = await sequelize.transaction();
        const {groupName} = req.body;
      //  console.log(`group name ${groupName}`);
        const userId = req.user.id;
        const group = await Groups.create({name: groupName}, {transaction});
      //  console.log("group id",group.dataValues.id);
        const userGroup = await User_Group.create({GroupId: group.dataValues.id, UserId: userId,isAdmin:true}, {transaction});
       // console.log("group created successfully",userGroup);
        await transaction.commit();
        return res.status(201).json({message: "Group created successfully", group: userGroup});
    }catch(error){
        if(transaction) await transaction.rollback();
        return res.status(500).json({message: error.message});
    }
}

exports.getGroups = async (req, res) => {
    let transaction;
    try{
        transaction = await sequelize.transaction();
        const userId = req.user.id;
        const userAllGroups = await User_Group.findAll({where: {UserId: userId}, transaction});
        const groups = await Groups.findAll({where: {id: userAllGroups.map(userGroup => userGroup.GroupId)}, transaction});
        await transaction.commit();
        return res.status(200).json({message: "Groups fetched successfully", groups: groups});
    }catch(error){
        if(transaction) await transaction.rollback();
        return res.status(500).json({message: error.message});
    }
}