module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('movie',{
        image: {
            type:DataTypes.STRING
        },
        content:{
            type:DataTypes.STRING
        },
        pubdate:DataTypes.DATEONLY,
        fav_nums:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        title:{
            type:DataTypes.STRING
        },
        type:{
            type:DataTypes.INTEGER
        }
    },{
        freezeTableName:false,
        timestamps:false,
        tableName:'movie'
    })
}