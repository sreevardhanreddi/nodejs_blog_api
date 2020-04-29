"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      last_activity: { type: DataTypes.DATE },
      is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_staff: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { underscored: true, tableName: "user" }
  );
  user.associate = function (models) {
    // associations can be defined here

    // 1 to 1 with profile
    user.hasOne(models.profile, {
      foreignKey: "user_id",
      as: "profile",
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    });

    // 1 to many with post
    user.hasMany(models.post, {
      foreignKey: "created_by",
      as: "user",
      onDelete: "SET NULL",
      onUpdate: "RESTRICT",
    });
  };
  return user;
};
