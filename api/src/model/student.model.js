'use strict';

module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define(
    "Students",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
        require:true
      },
      name: {
          type: DataTypes.STRING,
          allowNull: true,
            default:null
        },
        branch: {
            type: DataTypes.ENUM(
                'CSE',  
                'IT',   
                'ME',   
                'CE',   
                'AE',   
                'BT',   
                'Other' 
            ),
          allowNull: true,
          defaultValue: 'CSE',
        },
      semester: {
          type: DataTypes.ENUM('first',
              'second',
              'third',
              'fourth',
              'fifth',
              'sixth',
              'seventh',
              'eighth'),
        allowNull: false,
        defaultValue: 'first',
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
        default: null,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deletedAt",
      tableName: "students",
      paranoid: true,
    }
  );

  return Students;
};
