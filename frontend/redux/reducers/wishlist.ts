// @ts-nocheck
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist:
    typeof window !== "undefined" ? localStorage.getItem("wishlistItems") : [],
};

export const wishlistReducer = createReducer(initialState, {
  addToWishlist: (state, action) => {
    const item = action.payload;
    const isItemExist = state.wishlist.find((i: any) => i._id === item._id);
    if (isItemExist) {
      return {
        ...state,
        wishlist: state.wishlist.map((i: any) =>
          i._id === isItemExist._id ? item : i
        ),
      };
    } else {
      return {
        ...state,
        wishlist: [...state.wishlist, item],
      };
    }
  },

  removeFromWishlist: (state, action) => {
    return {
      ...state,
      wishlist: state.wishlist.filter((i: any) => i._id !== action.payload),
    };
  },
});
