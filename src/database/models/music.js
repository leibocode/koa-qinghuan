module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('music',{
        image: {
            type:DataTypes.STRING
        },
        content:{
            type:DataTypes.STRING
        },
        pubdate:DataTypes.DATEONLY,
        fav_nams:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        title:{
            type:DataTypes.STRING
        },
        type:{
            type:DataTypes.INTEGER
        },
        url:{
            type:DataTypes.STRING   
        }
    },{
        freezeTableName:false,
        timestamps:false,
        tableName:'music'
    })
}