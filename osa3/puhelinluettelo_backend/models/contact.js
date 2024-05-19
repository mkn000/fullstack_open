const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /(?<!.)((\d{2}-\d{5,})|(\d{3}-\d{4,}))(?!.)/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Contact = mongoose.model("Contact", contactSchema);

const url = process.env.MONGO_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((res) => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database: ", err.message);
  });

module.exports = Contact;
