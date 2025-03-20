import { Product } from "../models/ProductModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { fileuploder } from "../utils/cloudinary.js";
import { Cart } from "../models/CartModel.js";

const createProduct = asyncHandler(async(req,res)=>{
    const { quentity, price, description, category } = req.body;
    if(req.user.isBussiness === false){ throw new ApiError(402,"Account Must Be Business To Create Product") }
    const imagepath=req.file.path;
    if(!imagepath){ throw new ApiError(401,"Image Is Require To Post") }
    const image=await fileuploder(imagepath)
    if(!image){ throw new ApiError(401,"Image Is Require To Post") }
    if(!quentity || !price || !description || !category){ throw new ApiError(401,"All Fields Are Required") }
    const product=await Product.create({
        quentity,
        price,
        description,
        photo:image.url,
        category,
        seller:req.user._id
    })
    res.status(200).json(
        new ApiResponse(200,product,"Product Created Successfully")
    )
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const { productid } = req.params
    if(!productid){ throw new ApiError(401,"Product Id Is Required") }
    const product=await Product.findById(productid)
    if(!product){ throw new ApiError(404,"Product Not Found") }
    if(product.seller.toString() !== req.user._id.toString()){ throw new ApiError(403,"Unauthorized Access Denied")}
    await product.remove()
})

const getAllProduct = asyncHandler(async(req,res)=>{
    const products=await Product.find()
                                .populate("seller","username profilePhoto")
                                .sort({createdAt:-1})
    if(!products){ throw new ApiError(404,"No Product Found") }
    res.status(200).json(
        new ApiResponse(200,products,"All Product Fetched Successfully")
    )
}) 

const getSingleProduct = asyncHandler(async(req,res)=>{
    const { productid } = req.params
    if(!productid){ throw new ApiError(401,"Product Id Is Required") }
    const product=await Product.findById(productid)
                                .populate("seller","username profilePhoto")     
    if(!product){ throw new ApiError(404,"Product Not Found") }
    res.status(200).json(
        new ApiResponse(200,product,"Product Fetched Successfully")
    )
})

const updateProductPhoto = asyncHandler(async(req,res)=>{
    const { productid } = req.params
    if(!productid){ throw new ApiError(401,"Product Id Is Required") }
    const product = await Product.findById(productid)
    if(!product){ throw new ApiError(404,"Product Not Found") }
    if(product.seller.toString() !== req.user._id.toString()){ throw new ApiError(403,"Unauthorized Access Denied")}
    const imagepath=req.file.path;
    if(!imagepath){ throw new ApiError(401,"Image Is Require To Post") }
    const image=await fileuploder(imagepath)
    if(!image){ throw new ApiError(401,"Image Is Require To Post") }
    product.photo=image.url
    await product.save()
    res.status(200).json(
        new ApiResponse(200,product,"Product Photo Updated Successfully")
    )
})

const updateProductQuentity = asyncHandler(async(req,res)=>{
    const { productid } = req.params
    const { quentity } = req.body
    if(!productid){ throw new ApiError(401,"Product Id Is Required") }
    if(!quentity){ throw new ApiError(401,"Quentity Is Required") }
    const product = await Product.findById(productid)
    if(!product){ throw new ApiError(404,"Product Not Found") }
    if(product.seller.toString() !== req.user._id.toString()){ throw new ApiError(403,"Unauthorized Access Denied")}
    product.quentity=quentity
    await product.save()
    res.status(200).json(
        new ApiResponse(200,product,"Product Quentity Updated Successfully")
    )
})

const updateProductPrice = asyncHandler(async(req,res)=>{
    const { productid } = req.params
    const { price } = req.body
    if(!productid){ throw new ApiError(401,"Product Id Is Required") }
    if(!price){ throw new ApiError(401,"Price Is Required") }
    const product = await Product.findById(productid)
    if(!product){ throw new ApiError(404,"Product Not Found") }
    if(product.seller.toString() !== req.user._id.toString()){ throw new ApiError(403,"Unauthorized Access Denied")}
    product.price=price
    await product.save()
    res.status(200).json(
        new ApiResponse(200,product,"Product Price Updated Successfully")
    )
})

const updateProductDescription = asyncHandler(async(req,res)=>{
    const { productid } = req.params
    const { description } = req.body
    if(!productid){ throw new ApiError(401,"Product Id Is Required") }
    if(!description){ throw new ApiError(401,"Description Is Required") }
    const product = await Product.findById(productid)
    if(!product){ throw new ApiError(404,"Product Not Found") }
    if(product.seller.toString() !== req.user._id.toString()){ throw new ApiError(403,"Unauthorized Access Denied")}
    product.description=description
    await product.save()
    res.status(200).json(
        new ApiResponse(200,product,"Product Description Updated Successfully")
    )
})

const getProductByCategory = asyncHandler(async(req,res)=>{
    const { category } = req.params;
    if(!category){ throw new ApiError(401,"Category Is Required") }
    const products = await Product.find({category:category})
                                    .populate("seller","username profilePhoto")
                                    .sort({createdAt:-1})
    if(!products){ throw new ApiError(404,"No Product Found") }
    res.status(200).json(
        new ApiResponse(200,products,"All Product Fetched Successfully")
    )
})

const addProductReview = asyncHandler(async(req,res)=>{
    const { productid } = req.params;
    if(!productid){ throw new ApiError(401,"Product Id Is Required") }
    const { review } = req.body;
    console.log(req.body)
    if(!review){ throw new ApiError(401,"Review Is Required") }
    const product = await Product.findById(productid)
    if(!product){ throw new ApiError(404,"Product Not Found") }
    const alreadyReview=product.reviews.find((r)=>r.reviewBy.toString() === req.user._id.toString())
    if(alreadyReview){ throw new ApiError(401,"Already Reviewed") }
    product.reviews.push({
        reviewBy:req.user._id,
        review
    })
    await product.save()
    res.status(200).json(
        new ApiResponse(200,product,"Review Added Successfully")
    )
})

const addProductToCart = asyncHandler(async(req,res)=>{
    const  { productid } = req.params;
    if(!productid){ throw new ApiError(401,"Product Id Is Required") }
    const product = await Product.findById(productid)
    if(!product){ throw new ApiError(404,"Product Not Found") }
    const cart=await Cart.create({
        quentity:1,
        productinfo:productid,
        buyer:req.user._id
    })
    res.status(200).json(
        new ApiResponse(200,cart,"Product Added To Cart Successfully")
    )
})

const removeProductFromCart = asyncHandler(async(req,res)=>{
    const { productid } = req.params
    if(!productid){ throw new ApiError(401,"Product Id Is Required") }
    const cart=await Cart.findOneAndDelete({productinfo:productid,buyer:req.user._id})
    if(!cart){ throw new ApiError(404,"Product Not Found In Cart") }
    res.status(200).json(
        new ApiResponse(200,cart,"Product Removed From Cart Successfully")
    )
})

const calculateTotalPrice = asyncHandler(async(req,res)=>{
    const { productid } = req.params;
    if(!productid){ throw new ApiError(401,"Product Id Is Required") }
    const product = await Product.findById(productid)
    const cart=await Cart.findOne({productinfo:productid,buyer:req.user._id})
    if(!cart){ throw new ApiError(404,"Product Not Found In Cart") }
    const totalPrice=product.price*cart.quentity;
    res.status(200).json(
        new ApiResponse(200,totalPrice,"Total Price Calculated Successfully")
    )
})

const emptyCart = asyncHandler(async(req,res)=>{
    const cart=await Cart.deleteMany({buyer:req.user._id})
    res.status(200).json(
        new ApiResponse(200,cart,"Cart Emptied Successfully")
    )
})

export {
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
}
