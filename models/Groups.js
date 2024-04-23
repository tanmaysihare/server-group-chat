module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define('Groups', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    Groups.associate = (models) => {
        Groups.belongsToMany(models.Users, { through: models.User_Group });
        Groups.hasMany(models.Messages);
      };
    return Groups;
}