const mongoose = require('mongoose')


if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
} 

const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@puhelinluettelo-2gaxt.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

personSchema.plugin(uniqueValidator)
  
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('Puhelinluettelo:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
    mongoose.connection.close()
    })
    
} else {
    if (process.argv.length<5) {
    console.log('give name and number as argument')
    process.exit(1)
    }

const newName = process.argv[3]
const newNumber = process.argv[4]

const person = new Person({
    name: newName,
    number: newNumber
})

person.save().then(response => {
  console.log('person saved!');
  mongoose.connection.close();
})

}