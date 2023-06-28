const { default: mongoose } = require("mongoose");

// club member schema and model
const clubMemberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    classNum: {
      type: Number,
      required: true
    },
    rollNo: {
      type: String,
      required: true
    },
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' }
  });
  
  const ClubMember = mongoose.model('ClubMember', clubMemberSchema);
module.exports = ClubMember;