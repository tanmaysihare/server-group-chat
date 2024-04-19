module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define('Groups', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    Groups.associate = (models) => {
        Groups.hasMany(models.Messages, {
            onDelete: "cascade",
        });
        Groups.hasMany(models.Users, {
            onDelete: "cascade",
        });
    }
    return Groups;
}