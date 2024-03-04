import User from "./../models/userModel.js"
import AppError from "../utils/appError.js";

const AuthService = {
  async createUser(payload){
    const new_user = await User.create(payload)
    return new_user
  },

  async findUser(queries,select){
    const query = User.findOne(queries)
    if(select){
      query.select(select)
    }
    const user = await query.exec()
    if(!user){
      throw new AppError("User not found.",404)
    }

    return user
  },

  async updateUser(query,payload){
    const user = await User.updateOne(query,payload)
    if(!user){
      return new AppError("You are not authorized/User not found",405)
    }
    return user
  },

  async activateUser(query){
    const user = await User.findOne(query)
    if(!user){
      throw new AppError("User not found/Token is invalid or expired",404)
    }
    user.active = true;
    user.emailConfirmToken = undefined;
    user.emailConfirmExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return user
  },

  async resetPassword(query,payload){
    const user = await User.findOneAndUpdate(query,payload)
    if(!user){
      throw new AppError("Token is invalid/expired",405)
    }
    return user
  },

  async updatePassword(id,payload){
    const user = await User.findById(id).select("+password")
    if(!user){
      throw new AppError("User not found",404)
    }
    if (!(await user.correctPassword(payload.oldPassword, user.password))) {
      throw new AppError("Your current password is wrong.", 401);
    }
  
    user.password = payload.newPassword;
    user.confirmPassword = payload.confirmNewPassword;
    await user.save();

    return user
  }
}

export default AuthService