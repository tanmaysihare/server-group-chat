module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define('Messages', {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senderName:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    Messages.associate = (models) => {
        Messages.belongsTo(models.Users);
        Messages.belongsTo(models.Groups);
      };
    return Messages; 
}