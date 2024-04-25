// GET /api/classes/:classId/subjects
app.get('/api/classes/:classId/subjects', async (req, res) => {
    try {
        const { classId } = req.params;
        const subjects = await Subject.find({ class: classId });
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subjects', error });
    }
});
