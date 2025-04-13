import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart= createAsyncThunk("cart/fetchCart",async()=>{
  const res = await axios.get("/api/product/getCart",{
    withCredentials:true,
  })
  return res.data.data
})

export const addProductToCart = createAsyncThunk("cart/add",async({productid},thunkAPI)=>{
  try{
    console.log("Request Comming",productid)
   const addp= await axios.post("/api/product/addProductToCart",{
      productid,
      quentity:1.
    },{
      withCredentials:true,
    })
    console.log(addp)
    const res=await axios.get("/api/product/getCart",{
      withCredentials:true,
    })
    console.log(res.data.data)
    return res.data.data
  }catch(err){
    console.log(err)

    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
})

export const updateProductQuentity = createAsyncThunk("cart/updatequentity",async({productid,quentity})=>{
  console.log("Request Comming",productid,quentity)
  await axios.patch("/api/product/updateBuyerQuentity",{
    productid,
    quentity
  },{
    withCredentials:true,
  })
  const res=await axios.get("/api/product/getCart",{
    withCredentials:true,
  })
  return res.data.data
})

export const removeProductFromCart = createAsyncThunk("cart/remove",async({productid})=>{
  await axios.delete(`/api/product/removeProductFromCart/${productid}`,{
    withCredentials:true,
  })
  const res=await axios.get("/api/product/getCart",{
    withCredentials:true,
  })
  return res.data.data
})

const initialState = {
  items: [],
  loading:false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  //   addToCart: (state, action) => {
  //     const existingItem = state.items.find(
  //       (item) => item._id === action.payload._id
  //     );

  //     if (existingItem) {
  //       existingItem.quentity += 1;
  //     } else {
  //       state.items.push({ ...action.payload, quentity: 1 });
  //     }
  //   },

  //   removeFromCart: (state, action) => {
  //     const existingItem = state.items.find(
  //       (item) => item._id === action.payload
  //     );
  //     if (existingItem) {
  //       if (existingItem.quentity > 1) {
  //         existingItem.quentity -= 1;
  //       } else {
  //         state.items = state.items.filter(
  //           (item) => item._id !== action.payload
  //         );
  //       }
  //     }
  //   },

  //   updateQuantity: (state, action) => {
  //     const { _id, quentity } = action.payload;
  //     const item = state.items.find((item) => item._id === _id);
  //     if (item) {
  //       item.quentity = quentity;
  //     }
  //   },
  // },
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        console.error("Add to cart failed:", action.payload);
      })
      
      .addCase(updateProductQuentity.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
