module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('book',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true
        },
        fac_nums:{
            type:DataTypes.INTEGER,
            defaultValue:0
        }
    },{
        freezeTableName:false,
        timestamps:false,
        tableName:'book'
    })
}

