const { default: mongoose } = require("mongoose");

// club schema and model
const clubSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    president: {
        type: String,
        required: true
      },
      chairlady: {
        type: String,
        required: true
      },
      secretary: {
        type: String,
        required: true
      },
      date:{type:Date,default:Date.now},

    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClubMember' }]
  });
  
  const Club = mongoose.model('Club', clubSchema);
module.exports = Club;