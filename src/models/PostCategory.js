/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
  const PostCategorysTable = sequelize.define(
    'PostCategory', {  
      postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true }
  }, 
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true
    })

    PostCategorysTable.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: PostCategorysTable,
        foreignKey: 'postId',
        otherKey: 'categoryId'
      })

      models.Category.belongsToMany(models.BlogPost, {
        as: 'blogPosts',
        through: PostCategorysTable,
        foreignKey: 'categoryId',
        otherKey: 'postId'
      })
    }
    return PostCategorysTable;

}