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
        Users.hasMany(models.Messages, {
            onDelete: "cascade",
        });
        Users.hasMany(models.Groups, {
            onDelete: "cascade",
        });
    }
    return Users;
}