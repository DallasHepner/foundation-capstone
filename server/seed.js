require('dotenv').config()
const Sequelize = require('sequelize')

const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists characters;
        drop table if exists classes;
        drop table if exists races;
        drop table if exists names;

        create table classes(
            class_id serial primary key,
            class_name varchar
        );
        create table races(
            race_id serial primary key,
            race_name varchar
        );
        create table names(
            names_id serial primary key,
            char_names varchar
        );

        create table characters(
            char_id serial primary key,
            races integer references races(race_id),
            classes integer references classes(class_id),
            name integer references names(names_id)
        );

        insert into classes(class_name)
        values ('Barbarian'),
        ('Bard'),
        ('Cleric'),
        ('Druid'),
        ('Fighter'),
        ('Monk'),
        ('Paladin'),
        ('Ranger'),
        ('Rogue'),
        ('Sorcerer'),
        ('Warlock'),
        ('Wizard');
        
        insert into races(race_name)
        values ('Dragonborn'),
        ('Dwarf'),
        ('Elf'),
        ('Gnome'),
        ('Half-Elf'),
        ('Halfling'),
        ('Half-Orc'),
        ('Human'),
        ('Teifling');
        
        insert into names(char_names)
        values ('Eduna Yeoman'),
        ('Ulfric Thimblelock'),
        ('Rose Flynn'),
        ('Lewis Tumble'),
        ('Helle Grancourt'),
        ('Dodie Rygax'),
        ('Salmon Rosewood'),
        ('ZyraDumble'),
        ('Alisander Bordeaux'),
        ('Trix Topple'),
        ('Nance Ashmere'),
        ('Sigar Stow'),
        ('Everill Goddard'),
        ('Imarus Bimble'),
        ('Venessa Bythemont'),
        ('Melodia Mercer'),
        ('Reinald Bluestone'),
        ('Kestera Silvermane'),
        ('Theobald Gelder'),
        ('Cassandre Stormbrand');
        `).then(() => {
            console.log('DB Seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('Error seeding DB', err))
    },

    getCharacters: (req, res) => {
        sequelize.query(`
        SELECT * FROM characters`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    createCharacter: (req, res) => {
        sequelize.query(`
            insert into characters (RAND(race_id), RAND(class_id), RAND(names_id))
            returning*;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }
}