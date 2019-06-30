const sequelize = require('../middwares/database')

const {  
    Sequelize,
    Model 
} = require('sequelize')

const ClassicFields = {
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
    title:Sequelize.STRING,
    type:Sequelize.INTEGER
}
export default class Movie extends Model {
}

Movie.init(ClassicFields,{
    sequelize,
    tableName:'mobvie'
})

export default class Sentence extends Model {

}

Sentence.init(ClassicFields,{
    sequelize,
    tableName:'sentence'
})

export class Music extends Model {

}

const musicFields = Object.assign({
    url:Sequelize.STRING
},ClassicFields)

Music.init(musicFields,{
    sequelize,
    tableName:'music'
})





