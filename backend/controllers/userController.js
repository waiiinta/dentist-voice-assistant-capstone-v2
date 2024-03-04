import catchAsync from "./../utils/catchAsync.js"
import AppError from "./../utils/appError.js"
import User from "./../models/userModel.js"

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const UserController = {
  async updateProfile (req, res, next){
    // 1) Create error if user POSTs password data
    try {
      if (req.body.password || req.body.passwordConfirm) {
        throw new AppError(
            "This route is not for password updates. Please use /updateMyPassword.",
            400
          )
        
      }
    
      // 2) Filtered out unwanted fields names that are not allowed to be updated
      const filteredBody = filterObj(
        req.body,
        "dentistName",
        "dentistSurname",
        "dentistID"
      );
    
      // 3) Update user document
      const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
      });
    
      res.status(200).json({
        status: "success",
        data: {
          user: updatedUser,
        },
      });
    } catch (error) {
      return next(error)
    }
    
  }
}

export default UserController


