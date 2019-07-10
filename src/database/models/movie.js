module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('movie',{
        image: {
            type:Sequelize.STRING
        },
        content:{
            type:Sequelize.STRING
        },
        pubdate:Sequelize.DATEONLY,
        fav_nams:{
            type:Sequelize.INTEGER,
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
        tableName:'book'
    })
}