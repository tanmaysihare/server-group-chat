module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        name: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phoneNumber: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false,
        },
    });
    Users.associate = (models) => {
        Users.belongsToMany(models.Groups, { through: models.User_Group });
        Users.hasMany(models.Messages);
      };
    return Users;
}