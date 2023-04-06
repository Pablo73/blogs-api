/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
  const categerieBlog = sequelize.define( 'Categorie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: DataTypes.STRING,
      }, {
          underscored: true,
          timestamps: false,
          tableName: 'Categories'
      });

  return categerieBlog;
}