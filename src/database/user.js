const {
    Sequelize,
    Model
} = require('sequelize')

export default class User extends Model {

    static async verifyEmailPassword(email,plainPassword){
        
    }

    static async getUserByOpenid(openid){
        const user = await User.findOne({
            where:{
                openid
            }
        })
        return user
    }
    static async registerByOpenid(openid){
        return await User.create({
            openid
        })
    }
}

User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nickname:Sequelize.STRING,
    email:{
        type:Sequelize.STRING(20),
        unique:true
    },
    password:{

    },
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    }
},{
    sequelize,
    tableName:'user'
})