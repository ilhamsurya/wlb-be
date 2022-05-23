'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubComment.belongsTo(models.Comment);
      SubComment.belongsTo(models.User);
    }
  }
  SubComment.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Content cannot be null.',
          },
          notEmpty: {
            args: true,
            msg: 'Content cannot be empty.',
          },
        },
      },
      CommentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Comment Id cannot be null.',
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SubComment',
      freezeTableName: true,
    },
  );
  return SubComment;
};
