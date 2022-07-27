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
        drop table if exists characters
        drop table if exists classes
        drop table if exists races
        drop table if exists names

        create table characters(
            char_id serial primary key
            races varchar
            classes varchar
        )

        create table classes(
            class_id serial primary key
            class_name varchar
            char_id integer
        )
        create table races(
            race_id serial primary key
            race_name varchar
            char_id integer
        )
        create table names(
            names_id serial primary key
            char_names varchar
            char_id integer
        )

        insert into classes(class_name)
        values ('Barbarian')
        ('Bard')
        ('Cleric')
        ('Druid')
        ('Fighter')
        ('Monk')
        ('Paladin')
        ('Ranger')
        ('Rogue')
        ('Sorcerer')
        ('Warlock')
        ('Wizard')
        
        insert into races(race_name)
        values ('Dragonborn')
        ('Dwarf')
        ('Elf')
        ('Gnome')
        ('Half-Elf')
        ('Halfling')
        ('Half-Orc')
        ('Human')
        ('Teifling')
        
        insert into names(char_names)
        values ('Eduna Yeoman')
        ('Ulfric Thimblelock')
        ('Rose Flynn')
        ('Lewis Tumble')
        ('Helle Grancourt')
        ('Dodie Rygax')
        ('Salmon Rosewood')
        ('ZyraDumble')
        ('Alisander Bordeaux')
        ('Trix Topple')
        ('Nance Ashmere')
        ('Sigar Stow')
        ('Everill Goddard')
        ('Imarus Bimble')
        ('Venessa Bythemont')
        ('Melodia Mercer')
        ('Reinald Bluestone')
        ('Kestera Silvermane')
        ('Theobald Gelder')
        ('Cassandre Stormbrand')
        `).then(() => {
            console.log('DB Seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('Error seeding DB'))
    }
}