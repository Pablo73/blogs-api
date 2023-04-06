/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, _DataTypes) => {
  const PostCategoriesTable = sequelize.define(
    'posts_categorie', 
    {}, 
    {
      timestamps: false,
      tableName: 'post_categories',
      underscored: true
    })

    PostCategoriesTable.associate = (models) => {
      models.BlogPost.belongsToMany(models.Categorie, {
        as: 'Categories',
        through: PostCategoriesTable,
        foreignKey: 'postId',
        otherKey: 'categoryId'
      })

      models.Categorie.belongsToMany(models.BlogPost, {
        as: 'BlogPosts',
        through: PostCategoriesTable,
        foreignKey: 'categoryId',
        otherKey: 'postId'
      })
    }
    return PostCategoriesTable;
}