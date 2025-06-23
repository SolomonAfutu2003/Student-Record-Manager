import Students from "../model/Students.model.js";

// for the logics or functions of the routes

// For GET request
export const getAllStudents = async (_, res) => {
  try {
    const students = await Students.find().sort({ createdAt: -1 }); //-1 is for desc, 1 is for the ase
    res.status(200).json(students);
  } catch (error) {
    console.error("Error in getAllStudents controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// For GET request a student
export const getStudentById = async (req, res) => {
  try {
    const student = await Students.findById(req.params.id);

    if (!student) {
      res.status(404).json({ message: "student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error in getStudentById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// For POST request
export const createStudent = async (req, res) => {
  try {
    const { name, email, age, grade } = req.body;
    const newStudent = new Students({ name, email, age, grade });
    await newStudent.save();
    res.status(201).json({ message: "created" });
  } catch (error) {
    console.error("Error in createStudent controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// For PUT request
export const updateStudent = async (req, res) => {
  try {
    const { name, email, age, grade } = req.body;
    const updated = await Students.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        age,
        grade,
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error in updateStudent controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// For DELETE request
export const deleteStudent = async (req, res) => {
  try {
    await Students.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.error("Error in deleteStudent controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
