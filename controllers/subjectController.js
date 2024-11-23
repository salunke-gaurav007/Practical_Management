import Subject from '../models/subject.js';
import User from '../models/user.js';

export const createSubject = async (req, res) => {
    try {
      const { name, code, email } = req.body;
  
      const subject = new Subject({
        name,
        code,
        email,
      });
  
      const savedSubject = await Subject.save();
  
      res.status(201).json({
        savedSubject,
        message: "Subject created successfully",
        //subject: savedSubject,
      });
    } catch (error) {
      console.error(error);  // Log the error for better debugging
      return res.status(500).json({
        error: "Error while creating subject",
      });
    }
  };
  
  


export const getAllSubjects = async (req, res) => {
  try {
      // Fetch all admin users
      // const adminUsers = await User.find({ role: 'Admin' }, '._id'); // Get only the _id of admins
      // const adminIds = adminUsers.map(name => name._id); // Extract the IDs
      
      // Fetch all subjects created by admin users
      //const getSubjects = await Subject.find({ createdBy: { $in: adminIds } });
      const getSubjects = await Subject.find()
      res.json({
          success: true,
          subjects: getSubjects,
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          error: "Cannot fetch subjects data",
      });
      console.error(error);
  }
};