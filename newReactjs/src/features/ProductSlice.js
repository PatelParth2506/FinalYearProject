import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("/api/product/getAllProduct");
  console.log(response.data.data)
  const ramndomproducts = response.data.data.sort(()=>Math.random()-0.5)
  return ramndomproducts;
});
const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  searchItem: "",
  selectedCategory: "All",
};

// Search Products and Filter Category
const filterProducts = (state) => {
  return state.items.filter((product) => {
    const matchSearch = product.description
      .toLowerCase()
      .includes(state.searchItem.toLowerCase());

    const matchCategory =
      state.selectedCategory === "All" ||
      product.category === state.selectedCategory;

    return matchSearch && matchCategory;
  });
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchItem: (state, action) => {
      state.searchItem = action.payload;
      state.filteredItems = [...filterProducts(state)];
    },

    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      // state.filteredItems = [...filterProducts(state)];

      if(action.payload === "ALL"){
        state.filteredItems = state.items;
      }else{
        state.filteredItems=state.items.filter((p)=>p.category === action.payload)
      }
    },
  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchProducts.pending,(state)=>{

      })
      .addCase(fetchProducts.fulfilled,(state,action)=>{
        state.items=action.payload
        state.filteredItems=action.payload
      })
      .addCase(fetchProducts.rejected,(state,action)=>{
        console.log("Failed To Fetch Products",action.error.message)
      })
  }
});

export const { setSearchItem, setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;
