const { Model } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');

module.exports = function(sequelize, DataTypes) {
    const { ENUM, STRING } = DataTypes;
    class Users extends Model {}

    Users.init(
        {
            ...commonModel,
            username: {
                type: STRING({ length: 30 }),
                allowNull: false,
                unique: true
            },
            password: {
                type: STRING({ length: 30 }),
                allowNull: false
            },
            email: {
                type: STRING({ length: 256 }),
                allowNull: false,
                unique: true
            },
            status: {
                ENUM: (['Active', 'Inactive']),
                defaultValue: 'Inactive'
            }
        },
            { ...commonOptions, modelName: 'users', sequelize }
    );

    return Users;
};