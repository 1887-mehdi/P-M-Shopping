import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";

export const store = configureStore({ reducer: { shop: shopReducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  const { cart, wishlist } = store.getState().shop;
  try {
    localStorage.setItem("gop-shop-state", JSON.stringify({ cart, wishlist }));
  } catch {
    // Storage can be unavailable in private browsing; the in-memory shop still works.
  }
});
