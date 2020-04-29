"use strict";
module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define(
    "profile",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      profile_description: {
        type: DataTypes.STRING,
      },
      profile_pic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { underscored: true, tableName: "profile", timestamps: false }
  );
  profile.associate = function (models) {
    // associations can be defined here

    profile.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "profile",
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    });
  };
  return profile;
};
