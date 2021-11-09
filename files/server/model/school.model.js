const { Model } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');

module.exports = function(sequelize, DataTypes) {
    const { ENUM, STRING } = DataTypes;
    class Schools extends Model {}

    Schools.init(
        {
            ...commonModel,
            school_name: {
                type: STRING({ length: 256 }),
                allowNull: false,
                unique: true
            },
            board: {
                ENUM: (['State Board', 'CBSE']),
                defaultValue: 'State Board'
            },
            email: {
                type: STRING({ length: 256 }),
                allowNull: false,
                unique: true
            },
            city: {
                type: STRING({ length: 256 }),
                allowNull: false
            },

            school_login: {
                type: STRING({ length: 256 }),
                allowNull: false,
                unique: true
            },
            school_secrete: {
                type: STRING({ length: 256 }),
                allowNull: false,
                unique: true,
            },
            status: {
                ENUM: (['Active', 'Inactive']),
                defaultValue: 'Inactive'
            }
        },
            { ...commonOptions, modelName: 'schools', sequelize }
    );

    return Schools;
};