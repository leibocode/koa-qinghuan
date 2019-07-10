module.exports =(sequelize,DataTypes)=>{
    return sequelize.define('flow',{
        art_id:{
            type:DataTypes.INTEGER
        },
        index:{
            type:DataTypes.INTEGER
        },
        type:{
            type:DataTypes.INTEGER
        }
    },{
        freezeTableName: false,
        //默认为表添加create_at,update_at字段
        timestamps: false,
        tableName:'flow'
    })
}
