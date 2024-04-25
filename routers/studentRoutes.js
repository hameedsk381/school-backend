// GET /api/classes/:classId/students
app.get('/api/classes/:classId/students', async (req, res) => {
    try {
        const { classId } = req.params;
        const students = await Student.find({ class: classId });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
});
