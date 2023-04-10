/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, _DataTypes) => {
  const PostCategorysTable = sequelize.define(
    'posts_category', 
    {}, 
    {
      timestamps: false,
      tableName: 'posts_category',
      underscored: true
    })

    PostCategorysTable.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'Categories',
        through: PostCategorysTable,
        foreignKey: 'postId',
        otherKey: 'categoryId'
      })

      models.Category.belongsToMany(models.BlogPost, {
        as: 'BlogPosts',
        through: PostCategorysTable,
        foreignKey: 'categoryId',
        otherKey: 'postId'
      })
    }
    return PostCategorysTable;

}