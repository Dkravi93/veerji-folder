const Images = require('../model/imagemodel')
const getImages = require('../utils/uploadImage');
const postIt = async (req,res) => {
    try {
        const path = req.file;
        console.log(path);
        const newImg =  await getImages(path);
    
        const image = await Images.create({
            image : newImg
        })
    
        res.status(201).json({
            status : 'success',
            data : image
        })
        
    } catch (error) {
        console.log(error)
    }

};

module.exports = postIt;