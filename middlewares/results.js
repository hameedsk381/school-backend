// Middleware to check if the user is authenticated
exports.authenticate = (req, res, next) => {
    // Authentication logic here
    next();
};

// Middleware to check if the user is the class teacher for the specified class
exports.isClassTeacher = async (req, res, next) => {
    const { classId } = req.params;
    const teacherId = req.user._id;  // Assuming req.user is populated from the authenticate middleware

    const teacher = await Teacher.findById(teacherId);
    if (teacher.actingClassTeacherFor === classId) {
        next();
    } else {
        res.status(403).json({ message: "Unauthorized: You are not the class teacher for this class." });
    }
};
