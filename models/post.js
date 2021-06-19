const { Model, DataTypes } = require('sequelize');
const express = require('express');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userName: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }

        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
      }
);

module.exports = Post;