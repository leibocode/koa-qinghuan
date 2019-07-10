module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('comment',{
        nums:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        book_id:{
            type:DataTypes.INTEGER 
        }
    },{
        freezeTableName:false,
        timestamps:false,
        tableName:'comment'
    })
}