const router = require("express").Router();
const Story = require("../models/story_model");
const multer = require('multer');
const User = require("../models/user_model")
const { getVideoDurationInSeconds } = require('get-video-duration')



// defining storage params for multer
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/stories/');
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});

// inside multer({}), file upto only 10MB can be uploaded
const upload = multer({
    storage: storage,
    limits : {fileSize : 10000000}
});

// Create Story
router.post("/",  upload.single("story"), async (req, res) => {
    const {userId} = await req.body.userId;
    let timeLength = 0;
    
    console.log(req.file);
    const fileLoca = req.file.path;
    getVideoDurationInSeconds(fileLoca).then(async(duration) => {
      timeLength = duration;  
      console.log(timeLength);    
      if (timeLength < 30){
          const newStory = new Story({
              story: await req.file.path,
              userId: userId
          });
          const saveStory = await newStory.save();
          User.findByIdAndUpdate(userId,{$push: {stories:saveStory._id}},{new: true, useFindAndModify: false}).exec()
          .then(doc=>{console.log(doc)})
          .catch(err=>{res.status(400).json({message:err})})
          
          res.status(200).json(saveStory);
      }
      else{
          res.status(401).json({"message":"Only videos less than 31 seconds are allowed"})
      }  
  }).catch(err=>{res.status(500).json({message:err})})

})

//delete a story
router.delete("/:id", async (req, res) => {
    try {
      const story = await Story.findById(req.params.id);
      if (story.userId === req.body.userId) {
        await story.deleteOne();
        res.status(200).json("the story has been deleted");
      } else {
        res.status(403).json("you can delete only your story");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get("/:id", async (req, res) => {
  try{
    const storyId = req.params.id;
    const doc = await Story.findById(storyId)
    const views = doc.views;
    const setviews = await Story.findByIdAndUpdate(storyId,{$set:{views: views+1}});
    res.status(201).json({message: "http://localhost:3000"+doc.story, views: views+1});
    }
    catch(err){
        res.status(400).json({message: err || "Story has been removed"});
    }
})
  

module.exports = router