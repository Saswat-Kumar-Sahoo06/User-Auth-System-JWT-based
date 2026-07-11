import { Router } from 'express'
import {
    changePassword,
    deleteUser,
    loginUser,
    logoutUser,
    registerUser,
    updateDetails,
    updatePhoto
} from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/register').post(upload.single("photo"), registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(protect, logoutUser)
router.route('/updateDetails').patch(protect, updateDetails)
router.route('/updatePhoto').patch(protect, upload.single('photo'), updatePhoto)
router.route('/changePassword').patch(protect, changePassword)
router.route('/deleteUser').delete(protect, deleteUser)

export default router