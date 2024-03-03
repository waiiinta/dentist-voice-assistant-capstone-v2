const catchAsync = require("./../utils/catchAsync");
const Record = require("./../models/recordModel");
const FileReader = require("../utils/readFile.js")

const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

exports.getRecordData = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const recordData = await Record.findOne({ userId: userId });
  res.status(200).json({
    status: "success",
    data: recordData,
  });
});

exports.updateRecordData = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const recordData = await Record.findOneAndUpdate(
    { userId: userId },
    { ...req.body, timestamp: Date.now() },
    { new: true, upsert: true }
  );
  res.status(200).json({
    status: "success",
    data: recordData,
  });
});

exports.deleteRecordData = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const deletedData = await Record.findOneAndDelete({ userId: userId });
  res.status(200).json({
    status: "success",
    data: deletedData,
  });
});

exports.importRecordData = catchAsync(async (req,res)=>{
  const userId = req.user._id;
  const data = await FileReader(req.file)
  await unlinkAsync(req.file.path)
  const filename = req.file.originalname
  const patientId = filename.split('_')[0]
  const response = await Record.updateOne({
    userId:userId
  },{
    finished:false,
    patientId:patientId,
    recordData:data
  })
  // console.log(response)
  res.status(200).json({
    status: "success",
    updated: response.nModified,
  })
})
