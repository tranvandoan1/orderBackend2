import Student from "../models/student";
const ObjectId = require("mongodb").ObjectID;

//listStudent
export const listStudent = async (req, res) => {
  const { limit, page } = req.query;
  try {
    if (page && limit) {
      //getPage
      let perPage = parseInt(page);
      let current = parseInt(limit);
      if (perPage < 1 || perPage == undefined || current == undefined) {
        perPage = 1;
        current = 9;
      }
      const skipNumber = (perPage - 1) * current;
      try {
        await Student.find(req.query)
          .populate("campus_id")
          .skip(skipNumber)
          .limit(current)
          .sort({ statusCheck: 1 })
          .exec((err, doc) => {
            if (err) {
              res.status(400).json(err);
            } else {
              Student.find(req.query)
                .countDocuments({})
                .exec((count_error, count) => {
                  if (err) {
                    res.json(count_error);
                    return;
                  } else {
                    res.status(200).json({
                      total: count,
                      list: doc,
                    });
                    return;
                  }
                });
            }
          });
      } catch (error) {
        res.status(400).json(error);
      }
    }else{
      const listStudent =  await Student.find({});
      res.status(200).json({
        total: listStudent.length,
        list: listStudent,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//updateStudent
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { id: req.params.id },
      { new: true }
    );
    return res.status(200).json(student);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//removeStudent
export const removeStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ id: req.params.id });
    res.json(student);
  } catch (error) {
    console.log("Lỗi r");
  }
};

//readOneStudent
export const readOneStudent = async (req, res) => {
  const student = await Student.findOne({ mssv: req.params.id }).exec();
  res.json(student);
};

//insertStudent
export const insertStudent = async (req, res) => {
  try {
    const checkStudent = await Student.find({}).limit(3);
    if (checkStudent.length > 0) {
      const listNew = [];
      await req.body.forEach((item) => {
        listNew.push(item.mssv);
      });

      const lan1 = await Student.updateMany(
        {},
        {
          $set: {
            checkUpdate: false,
            checkMulti: false,
          },
        },
        { multi: true }
      );
      // console.log("lan1", lan1);
      const lan2 = await Student.updateMany(
        { mssv: { $in: listNew } },
        {
          $set: {
            checkUpdate: true,
            checkMulti: true,
          },
        },
        { multi: true }
      );
      // console.log("lan2", lan2);

      const lan3 = await Student.updateMany(
        { checkUpdate: false },
        {
          $set: {
            statusCheck: 3,
            checkUpdate: true,
          },
        },
        { multi: true }
      );
      // console.log("lan3", lan3);
      await Student.insertMany(req.body);

      const c = await Student.updateMany(
        { $and: [{ mssv: { $in: listNew } }, { checkMulti: false }] },
        {
          $set: {
            checkUpdate: false,
          },
        },
        { multi: true }
      );
      // console.log("áddsa", c);
      const a = await Student.deleteMany({ checkUpdate: false });
      // console.log(a);

      await Student.find(req.query)
        .populate("campus_id")
        .limit(20)
        .sort({ statusCheck: 1 })
        .exec((err, doc) => {
          if (err) {
            res.status(400).json(err);
          } else {
            Student.find(req.query)
              .countDocuments({})
              .exec((count_error, count) => {
                if (err) {
                  res.json(count_error);
                  return;
                } else {
                  res.status(200).json({
                    total: count,
                    list: doc,
                  });
                  return;
                }
              });
          }
        });
    } else {
      await Student.insertMany(req.body);
      await Student.find(req.query)
        .populate("campus_id")
        .limit(20)
        .sort({ statusCheck: 1 })
        .exec((err, doc) => {
          if (err) {
            res.status(400).json(err);
          } else {
            Student.find(req.query)
              .countDocuments({})
              .exec((count_error, count) => {
                if (err) {
                  res.json(count_error);
                  return;
                } else {
                  res.status(200).json({
                    total: count,
                    list: doc,
                  });
                  return;
                }
              });
          }
        });
    }
  } catch (error) {
    res.status(400).json({
      error: "Create Student failed",
    });
    return;
  }
};

//updateReviewerStudent
export const updateReviewerStudent = async (req, res) => {
  const { listIdStudent, email } = req.body;
  try {
    const data = await Student.updateMany(
      { _id: { $in: listIdStudent } },
      {
        $set: {
          reviewer: email,
        },
      },
      { multi: true }
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

//updateStatusStudent
export const updateStatusStudent = async (req, res) => {
  const { listIdStudent, status } = req.body;
  const listIdStudents = await listIdStudent.map((id) => ObjectId(id));
  try {
    const data = await Student.updateMany(
      {
        _id: { $in: listIdStudents },
      },
      {
        $set: {
          statusCheck: status,
        },
      },
      { multi: true, new: true }
    );
    const listStudentChangeStatus = await Student.find({
      _id: { $in: listIdStudent },
      statusCheck: status,
    });
    return res.json({ listStudentChangeStatus, status });
  } catch (error) {
    console.log(error);
  }
};

//listStudentAssReviewer
// export const listStudentAssReviewer = async (req, res) => {
//   const { emailReviewer } = req.query;
//   try {
//     const listStudentAssReviewer = await Student.find({
//       reviewer: emailReviewer,
//     });
//     res.status(200).json(listStudentAssReviewer);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

//listStudentReviewForm
export const listStudentReviewForm = async (req, res) => {
  try {
    const listStudentReviewForm = await Student.find({
      CV: { $ne: null },
      statusCheck: 2,
    });
    res.status(200).json(listStudentReviewForm);
  } catch (error) {
    res.status(400).json(error);
  }
};

//listStudentReviewCV
export const listStudentReviewCV = async (req, res) => {
  try {
    const listStudentReviewCV = await Student.find({
      CV: { $ne: null },
      form: null,
      report: null,
      statusCheck: { $in: [0, 1] },
    });
    res.status(200).json(listStudentReviewCV);
  } catch (error) {
    res.status(400).json(error);
  }
};
