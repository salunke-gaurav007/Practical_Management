import Practical from '../models/practical.js';
import Subject from '../models/subject.js';

export const createPractical = async (req, res) => {
  try {
    const { subjectId, title, description,email } = req.body;

    const practical = new Practical({
      subjectId,
      title,
      description,
      email,
    });

    const savedPractical = await practical.save();

    const updatedSubject = await Subject.findById(subjectId)
      .populate("email", "name")
      .exec();

    res.status(201).json({
      message: "Practical created successfully",
      practical: savedPractical,
      subject: updatedSubject,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error while creating practical",
    });
  }
};

export const enrollStudent = async (req, res) => {
  try {
    const { practicalId, studentId } = req.body;

    const updatedPractical = await Practical.findByIdAndUpdate(
      practicalId,
      { $push: { enrolledStudents: studentId } },
      { new: true }
    )
      .populate("enrolledStudents", "name email")
      .exec();

    res.json({
      message: "Student enrolled successfully",
      practical: updatedPractical,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error while enrolling student",
    });
  }
};


export const getAllPracticals = async (req, res) => {
    try {
        
        const practicals = await Practical.find()
            .populate('subjectId', 'name code') 
            .populate('email', 'name email') 
            .populate('enrolledStudents', 'name email'); 

        res.status(200).json({
            success: true,
            practicals,
        });
    } catch (error) {
        console.error("Error fetching practicals:", error);
        res.status(500).json({
            success: false,
            error: "Cannot fetch practicals data",
        });
    }
};