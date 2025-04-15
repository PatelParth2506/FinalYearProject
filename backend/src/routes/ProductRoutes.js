import { Router } from "express";
import { auth } from "../middelwares/auth.js"
import { upload } from "../middelwares/multer.js";
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getSingleProduct,
    updateProductPhoto,
    updateProductQuentity,
    updateProductPrice,
    updateProductDescription,
    getProductByCategory,
    addProductReview,
    addProductToCart,
    removeProductFromCart,
    calculateTotalPrice,
    emptyCart,
    getBusinessProduct,
    getCart,
    updateProductQuentityByBuyer,
    createorder,
    getallorderofseller,
    getsellersbuyers
} from "../controllers/ProductController.js";

const router = Router()

router.route("/createProduct").post(auth, upload.single("photo"), createProduct)
router.route("/deleteProduct/:productid").delete(auth, deleteProduct)
router.route("/getAllProduct").get(getAllProduct)
router.route("/getSingleProduct/:productid").get(getSingleProduct)
router.route("/updateProductPhoto/:productid").patch(auth, upload.single("photo"), updateProductPhoto)
router.route("/updateProductQuentity/:productid").patch(auth, updateProductQuentity)
router.route("/updateProductPrice/:productid").patch(auth, updateProductPrice)
router.route("/updateProductDescription/:productid").patch(auth, updateProductDescription)
router.route("/getProductByCategory/:category").get(getProductByCategory)
router.route("/addProductReview/:productid").post(auth, addProductReview)

router.route("/addProductToCart").post(auth, addProductToCart)
router.route("/removeProductFromCart/:productid").delete(auth, removeProductFromCart)
router.route("/calculateTotalPrice/:productid").get(auth, calculateTotalPrice)
router.route("/emptyCart").delete(auth, emptyCart)
router.route("/getCart").get(auth, getCart)
router.route("/updateBuyerQuentity").patch(auth,updateProductQuentityByBuyer)

router.route("/getBusinessProduct").get(auth, getBusinessProduct)
router.route("/getSellersBuyers").get(auth,getsellersbuyers)

router.route("/createOrder").post(auth,createorder)
router.route("/getOrder").get(auth,getallorderofseller)


export default router