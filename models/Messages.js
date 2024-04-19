module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define('Messages', {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    Messages.associate = (models) => {
        Messages.belongsTo(models.Users, {
           onDelete: "cascade",
        });
        Messages.belongsTo(models.Groups, {
            onDelete: "cascade",
        });      
    }
    return Messages; 
}