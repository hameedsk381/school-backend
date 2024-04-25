const studentSchema = new mongoose.Schema({
    name: {
      firstName: String,
      lastName: String
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    },
    rollNumber: String,
    email: String
  });
  
  const Student = mongoose.model('Student', studentSchema);
  