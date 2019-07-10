module.exports = (sequelize,DataTypes)=> {
    return sequelize.define('hot_book',{
        
    },{
        freezeTableName:false,
        timestamps:false,
        tableName:'hot_book'
    })
}