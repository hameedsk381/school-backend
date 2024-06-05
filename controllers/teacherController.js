
const Teacher = require('../models/teacherModel'); // Ensure you have a Teacher model

// Register a new teacher
exports.registerTeacher = async (req, res) => {
    const { name, email, password, regId, department, contact, qualifications, languages, isAdmin,classesTeaching,additionalclassesTeaching } = req.body;

    try {
        const newTeacher = new Teacher({
            name,
            email,
            password,  // Note: Storing password as plain text (not recommended)
            regId,
            department,
            contact,
            qualifications,
            languages,
            isAdmin,classesTeaching,additionalclassesTeaching
        });

        await newTeacher.save();
        res.status(201).json({ message: "Teacher registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering teacher", error: error.message });
        console.log(error)
    }
};

// Login a teacher
exports.loginTeacher = async (req, res) => {
    const { email, password } = req.body;

    try {
        const teacher = await Teacher.findOne({ email }).populate('classesTeaching').populate('additionalclassesTeaching');
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        if (teacher.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Logged in successfully",teacher });
    } catch (error) {
        res.status(500).json({ message: "Login error", error: error.message });
    }
};

// Update teacher profile
exports.updateTeacherProfile = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.json({ message: "Teacher profile updated successfully", updatedTeacher });
    } catch (error) {
        res.status(500).json({ message: "Error updating teacher profile", error: error.message });
    }
};
exports.resetPassword =  async (req, res) => {
    const { email } = req.body;
    try {
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        const resetToken = (Math.random() + 1).toString(36).substring(7); // Simple random token generator
        teacher.resetToken = resetToken;
        await teacher.save();

        // Send resetToken via email or another medium in a real application
        console.log("Reset token (normally send via email):", resetToken);

        res.json({ message: "Reset token generated and sent to the teacher's email." });
    } catch (error) {
        res.status(500).json({ message: "Error generating reset token", error: error.message });
    }
}
exports.confirmReset = async (req, res) => {
    const { resetToken, newPassword } = req.body;
    try {
        const teacher = await Teacher.findOne({ resetToken });
        if (!teacher) {
            return res.status(404).json({ message: "Invalid or expired reset token" });
        }

        teacher.password = newPassword; // Directly assigning new password, no hashing
        teacher.resetToken = undefined; // Clear the reset token
        await teacher.save();

        res.json({ message: "Password has been successfully reset" });
    } catch (error) {
        res.status(500).json({ message: "Failed to reset password", error: error.message });
    }
}

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({}, { _id: 1, name: 1 });
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve teachers", error });
    }
};
