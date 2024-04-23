
const { Messages,sequelize} = require("../models");

exports.postMessage = async (req, res) => {
    let transaction;
    try{
        transaction = await sequelize.transaction();

        const senderId = req.user.id;
        const {message} = req.body;
        const groupId = req.params.id;
        const senderName = req.user.name;

        await Messages.create({message: message, UserId: senderId,GroupId:groupId, senderName:senderName}, {transaction});
        await transaction.commit();
        res.status(200).json({message: "Message sent"});
    }catch(error){
        if(transaction) await transaction.rollback();
        res.status(500).json({message: error.message});
        console.log(error);
    }
}

exports.getMessages = async (req, res) => {
        

    let transaction;
    try{
        transaction = await sequelize.transaction();
        const groupId = req.params.id;
        if(!groupId){
            return res.status(400).json({messages: "group not founded"});
        }
         const messages = await Messages.findAll({where:{GroupId:groupId}} );
          await transaction.commit();
          return res.status(200).json({messages: messages});

    }catch(error){
        if(transaction) await transaction.rollback();
        res.status(500).json({message: error.message});
        console.log(error);
    }    
}
