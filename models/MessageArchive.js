module.exports = (sequelize, DataTypes) => {
    const MessageArchive = sequelize.define('MessageArchive', {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senderName:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    MessageArchive.associate = (models) => {
        MessageArchive.belongsTo(models.Users);
        MessageArchive.belongsTo(models.Groups);
      };
    return MessageArchive; 
}