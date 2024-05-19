const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length < 3) {
  console.log('give password')
  process.exit(1)
}

const pw = process.argv[2]

const url = `mongodb+srv://mkn00:${pw}@jamkweb.2qs2x.mongodb.net/contacts?retryWrites=true&w=majority&appName=jamkweb`
mongoose.set('strictQuery', false)
mongoose.connect(url)

if (process.argv.length > 3) {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  })

  contact.save().then((res) => {
    console.log(`added ${res.name} number ${res.number} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  Contact.find({}).then((res) => {
    console.log('phonebook:')
    res.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
}
