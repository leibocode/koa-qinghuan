module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('user',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nickname:DataTypes.STRING,
        email:{
            type:DataTypes.STRING(20),
            unique:true
        },
        password:{
            type:DataTypes.STRING
        },
        openid:{
            type:DataTypes.STRING(64),
            unique:true
        }
    },{
        reezeTableName: false,
        //默认为表添加create_at,update_at字段
        timestamps: false,
        tableName:'user'
    })
}
