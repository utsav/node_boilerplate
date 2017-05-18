var multer = require('multer');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, appDir + '/../public/uploads');
    },
    filename: function (req, file, callback) {
       callback(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({storage: storage}).fields([
    {name: 'fileImage', maxCount: 1}
]);

var storageIcon = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, appDir + '/../public/uploads/icons');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
var uploadIcon = multer({storage: storageIcon}).fields([
    {name: 'fileIcon', maxCount: 1}
]);

exports.uploadObj = upload;

exports.uploadIconObj = uploadIcon;

exports.uploadImage = function (req, res) {
   console.log('here');
    if (!req.files || !req.files.fileImage) {
        return res.status(400).json({message: 'No file are selected'});
    }
    console.log(req.secure);
    var url = (req.secure ? "https://" : "http://") + req.headers.host + "/uploads/" + req.files.fileImage[0].filename;
    return res.status(200).json({fileName : req.files.fileImage[0].filename, url: url});
};

exports.uploadIconImage = function (req, res) {

    if (!req.files || !req.files.fileIcon) {
        return res.status(400).json({message: 'No file are selected'});
    }

    return res.status(200).json({fileName : req.files.fileIcon[0].filename});
};
