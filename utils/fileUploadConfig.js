const multer = require("multer");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    //   if set to false does not save the file
    cb(null, false);
    return cb(
      {
        success: false,
        message: "Invalid file type. Only jpg, png image files are allowed.",
      },
      false
    );
    // return cb(Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const fileSizeLimit = {
  fileSize: 1 * 1024 * 1024,
};

const uploadConfig = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: fileSizeLimit,
});

const blogCoverImage = uploadConfig.single("cover_image");

const blogCoverImageValidator = (req, res, next) => {
  blogCoverImage(req, res, (err) => {
    if (err) {
      res.status(400);
      return res.json(err);
    }
    next();
  });
};

module.exports = { uploadConfig, blogCoverImageValidator };
