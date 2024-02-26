import Record from "./../models/recordModel.js"
import AppError from "../utils/appError.js"

const RecordController = {
  async getRecordData(req, res,next){
    try {
      const userId = req.user._id;
      if(!userId){
        throw new AppError("User ID lost",400)
      }
      const recordData = await Record.findOne({ userId: userId });
      res.status(200).json({
        status: "success",
        data: recordData,
    });
    } catch (error) {
      return next(error)
    }
    
  },
  
  async updateRecordData(req, res,next){
    try {
      const userId = req.user._id;
      if(!userId){
        throw new AppError("User ID lost",400)
      }

      const recordData = await Record.findOneAndUpdate(
        { userId: userId },
        { ...req.body, timestamp: Date.now() },
        { new: true, upsert: true }
      );
      res.status(200).json({
        status: "success",
        data: recordData,
      });
    } catch (error) {
      return next(error)
    }
    
  },
  
  async deleteRecordData(req, res,next){
    try {
      const userId = req.user._id;
      if(!userId){
        throw new AppError("User ID lost",400)
      }
      const deletedData = await Record.findOneAndDelete({ userId: userId });
      res.status(200).json({
        status: "success",
        data: deletedData,
      });
    } catch (error) {
      return next(error)
    }
    
  },
  
  async importRecordData(req,res,next){
    try {
      const userId = req.user._id
      console.log(userId)
    } catch (error) {
      return next(error)
    }
  }
}

export default RecordController
