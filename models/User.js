const { Model, Datatypes } = require('sequelize');
const bcrypt = require ('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(validate){
        return bcrypt.compareSync(validate, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
    hooks: {
        async beforeCreate(newUser) {
         newUser.password = await bcrypt.hash(newUser.password, 15);
         return newUser;
         }
     },

     sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'user'
    }
);

module.export = User;