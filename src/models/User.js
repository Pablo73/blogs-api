/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
  const userBlog = sequelize.define( 'User', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      displayName: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      }, {
          underscored: true,
          timestamps: false,
          tableName: 'Users'
      });

      userBlog.associate = (models) => {
        userBlog.hasMany(models.BlogPost,
          { foreignKey: 'id', 
            as: 'blogPosts' 
          });
      };

  return userBlog;
}