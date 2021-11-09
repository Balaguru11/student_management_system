const { Model } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');

module.exports = function(sequelize, DataTypes) {
    const {ENUM, STRING, INTEGER } = DataTypes;
    class Classrooms extends Model {}

    Classrooms.init(
        {
            ...commonModel,
            class_section: {
                type: STRING({ length: 30 }),
                allowNull: false
            },
            medium: {
                ENUM: (['Tamil', 'English', 'Hindi']),
                defaultValue: 'English'
            },
            students_strength: {
                type: INTEGER({ length: 30 }),
                allowNull: false
            }
        },
        { ...commonOptions, modelName: 'classrooms', sequelize }
    );

    return Classrooms;
}