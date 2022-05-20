'use strict';
const { Model } = require('sequelize');
const { generateHash } = require('../helpers/passwordHash');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            args: true,
            msg: 'Username cannot be null!',
          },
          notEmpty: {
            args: true,
            msg: 'Username cannot be empty!',
          },
          async isUsernameUnique(value) {
            const user = await User.findOne({
              where: {
                username: value,
              },
            });
            if (user) {
              throw new Error('Username must be unique.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            args: true,
            msg: 'Email cannot be null.',
          },
          notEmpty: {
            args: true,
            msg: 'Email cannot be empty.',
          },
          isEmail: {
            args: true,
            msg: 'Please enter a valid email address',
          },
          async isEmailUnique(value) {
            const email = await User.findOne({
              where: {
                email: value,
              },
            });
            if (email) {
              throw new Error(
                'This email address is already used by other user',
              );
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Password cannot be null.',
          },
          notEmpty: {
            args: true,
            msg: 'Password cannot be empty.',
          },
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  User.beforeCreate(async (user, options) => {
    user.password = generateHash(user.password);
    user.status = 'REGISTERED';
  });
  return User;
};
