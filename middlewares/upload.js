const path=require('path');
const multer=require('multer');

var storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"public/storage/");//create storage folder in root directory manually
    },
    filename:(req,file,cb)=>{
        let ext=path.extname(file.originalname);
        cb(null,Date.now() + ext);
    }
});

var upload= multer({
storage: storage,
limits:{
    fileSize: 1024 * 1024 * 2, //mean 2mb
},
fileFilter:(req,file,cb)=>{
    if(file.mimetype === "image/jpg"  || 
    file.mimetype ==="image/jpeg"  || 
    file.mimetype ===  "image/png"){
    cb(null,true);
}else{
    cb(new Error('Image uploaded is not of type jpg/jpeg or png'),false);
}

}
});

module.exports=upload;