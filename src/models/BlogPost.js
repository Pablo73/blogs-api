/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
  const blogsPost = sequelize.define( 'BlogPost', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
      }, {
          underscored: true,
          timestamps: false,
          tableName: 'blog_posts'
      });

      blogsPost.associate = (models) => {
        blogsPost.belongsTo(models.User,
            { foreignKey: 'user_id', as: 'users' });
        };
        
  return blogsPost;
}