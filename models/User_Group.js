module.exports = (sequelize, DataTypes) => {

    const User_Group = sequelize.define('User_Group', {

          isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          }
    });

    return User_Group;
}