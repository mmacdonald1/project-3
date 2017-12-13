var bcrypt = require("bcrypt-nodejs");
module.exports = function(sequelize, DataTypes) {
  //this is where the table gets defined, exported to index.js
  var User = sequelize.define("User", {

    username: {
          type: DataTypes.STRING,
          allowNull: false
      },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    classMethod: {
          associate: function(models) {
              User.hasMany(models.Application, {
                  onDelete: "cascade"
              });
          }
      },
      classMethods: {
          associate: function(models) {
              User.hasMany(models.Contacts, {
                  onDelete: "cascade"
              });
          }
      },
      classMethods: {
          associate: function(models) {
              User.hasOne(models.Profile, {
                  onDelete: "cascade"
              });
          }
      }
  });
  
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  User.associate = function(models) {
    models.User.hasMany(models.Application);
  };
  return User;
};
