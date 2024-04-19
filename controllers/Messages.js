const { Messages,sequelize} = require("../models");

exports.postMessage = async (req, res) => {
    let transaction;
    try{
        transaction = await sequelize.transaction();

        const senderId = req.user.id;
        const {message} = req.body;

        await Messages.create({message: message, UserId: senderId}, {transaction});
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
        const messages = await Messages.findAll( );
        await transaction.commit();
        res.status(200).json({messages: messages});
    }catch(error){
        if(transaction) await transaction.rollback();
        res.status(500).json({message: error.message});
        console.log(error);
    }    
}
