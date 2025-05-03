import { Router } from 'express'
import { upload } from '../middelwares/multer.js';
import { register,
         login,
         logout,
         refreshTokenGenrate,
         changePassword,
         updateUserDetails,
         changeProfilePhoto,
         getProfile,
         FollowUser,       
         unfollowUser,
         getUserByID,
         ToggleFollow,
         getalluser,
         getUsersByIds,
         adminlogin
 } from '../controllers/RegisterControllers.js';
import { auth } from "../middelwares/auth.js"

const router=Router();

router.route("/register").post(
    upload.fields([
        {
            name:"profilePhoto",
            maxCount:1
        }
    ])
,register)
router.route("/login").post(login)
router.route("/logout").post(auth,logout)
router.route("/genrateToken").post(refreshTokenGenrate)
router.route("/passwordchnge").patch(auth,changePassword)
router.route("/accountdetailchange").patch(auth,updateUserDetails)
router.route("/profilePhotochange").patch(auth,upload.single("profilePhoto"),changeProfilePhoto)
router.route("/getUserProfile").get(auth,getProfile)
router.route("/getuser/:userid").get(auth,getUserByID)
router.route("/follow/:userid").post(auth,FollowUser)
router.route("/unfollow/:userid").post(auth,unfollowUser)
router.route("/togglefollow/:userid").post(auth,ToggleFollow)
router.route("/getuserbyids").post(getUsersByIds)

router.route("/getalluser").post(getalluser)
router.route("/adminlogin").post(adminlogin)

export default router