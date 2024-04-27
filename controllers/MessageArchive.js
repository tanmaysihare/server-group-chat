const cron = require('node-cron');
const {Messages, MessageArchive, Sequelize,sequelize} = require("../models");

cron.schedule('0 0 * * *', async () => {
    let transaction;
    const twentyFourHoursAgo = new Date(new Date() - 24 * 60 * 60 * 1000);
    try{
        transaction = await sequelize.transaction();
        const oldMessages = await Messages.findAll({
            where: {
                createdAt: {
                    [Sequelize.Op.lt]: twentyFourHoursAgo
                },transaction
            },
        });
        await MessageArchive.bulkCreate(oldMessages.map(message => ({
            message: message.message,
            senderName: message.senderName,
            senderId: message.senderId,
            createdAt: message.createdAt,
            GroupId: message.GroupId,
            UserId: message.UserId,
        })),{transaction});
        await Messages.destroy({
            where: {
                createdAt: {
                    [Sequelize.Op.lt]: twentyFourHoursAgo
                },transaction
            },
        });
        await transaction.commit();
        console.log("Old messages deleted");
    }catch(error){
        if(transaction) await transaction.rollback();
        console.log(error);
    }
});

cron.start();