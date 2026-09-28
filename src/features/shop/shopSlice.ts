import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartLine = { productId: string; quantity: number; size: string };
export type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  search: string;
  category: string;
  sort: "featured" | "price-low" | "price-high";
};

const saved = (() => {
  try {
    const raw = localStorage.getItem("gop-shop-state");
    return raw
      ? (JSON.parse(raw) as Pick<ShopState, "cart" | "wishlist">)
      : null;
  } catch {
    return null;
  }
})();

const initialState: ShopState = {
  cart:
    saved?.cart?.map((line: CartLine) => ({
      ...line,
      size: line.size ?? "M",
    })) ?? [],
  wishlist: saved?.wishlist ?? [],
  search: "",
  category: "All pieces",
  sort: "featured",
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ productId: string; size?: string }>,
    ) {
      const size = action.payload.size ?? "M";
      const line = state.cart.find(
        (item) =>
          item.productId === action.payload.productId && item.size === size,
      );
      if (line) line.quantity += 1;
      else
        state.cart.push({
          productId: action.payload.productId,
          quantity: 1,
          size,
        });
    },
    removeFromCart(
      state,
      action: PayloadAction<{ productId: string; size: string }>,
    ) {
      state.cart = state.cart.filter(
        (item) =>
          item.productId !== action.payload.productId ||
          item.size !== action.payload.size,
      );
    },
    setQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        size: string;
        quantity: number;
      }>,
    ) {
      const line = state.cart.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size,
      );
      if (line) {
        if (action.payload.quantity < 1)
          state.cart = state.cart.filter(
            (item) =>
              item.productId !== action.payload.productId ||
              item.size !== action.payload.size,
          );
        else line.quantity = action.payload.quantity;
      }
    },
    toggleWishlist(state, action: PayloadAction<string>) {
      if (state.wishlist.includes(action.payload))
        state.wishlist = state.wishlist.filter((id) => id !== action.payload);
      else state.wishlist.push(action.payload);
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<ShopState["sort"]>) {
      state.sort = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setQuantity,
  toggleWishlist,
  setSearch,
  setCategory,
  setSort,
} = shopSlice.actions;
export default shopSlice.reducer;
