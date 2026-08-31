import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { products as seedProducts } from "@/data/products";
import { categories as seedCategories } from "@/data/categories";
import { banners as seedBanners } from "@/data/banners";
import { coupons as seedCoupons } from "@/data/coupons";
import { orders as seedOrders } from "@/data/orders";
import { customers as seedCustomers } from "@/data/customers";
import { storeInfo as seedStoreInfo } from "@/data/store-info";

const StoreContext = createContext(null);

let toastId = 0;

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(seedProducts);
  const [categories, setCategories] = useState(seedCategories);
  const [banners, setBanners] = useState(seedBanners);
  const [coupons, setCoupons] = useState(seedCoupons);
  const [orders, setOrders] = useState(seedOrders);
  const [customers] = useState(seedCustomers);
  const [settings, setSettings] = useState(seedStoreInfo);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  const toast = useCallback((message, tone = "success") => {
    const id = ++toastId;
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  /* ---------------- cart ---------------- */
  const addToCart = useCallback(
    (product, { size, color, qty = 1 } = {}) => {
      const chosenSize = size || product.sizes[0];
      const chosenColor = color || product.colors[0];
      const key = `${product.id}|${chosenSize}|${chosenColor}`;
      setCart((items) => {
        const found = items.find((i) => i.key === key);
        if (found) {
          return items.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
        }
        return [
          ...items,
          {
            key,
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            originalPrice: product.originalPrice,
            size: chosenSize,
            color: chosenColor,
            qty,
          },
        ];
      });
      toast(`${product.name} added to bag`);
    },
    [toast],
  );

  const updateQty = useCallback((key, qty) => {
    setCart((items) =>
      items.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)),
    );
  }, []);

  const removeFromCart = useCallback(
    (key) => {
      setCart((items) => items.filter((i) => i.key !== key));
      toast("Removed from bag", "info");
    },
    [toast],
  );

  const clearCart = useCallback(() => setCart([]), []);

  /* ---------------- wishlist ---------------- */
  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((list) => {
        if (list.includes(productId)) {
          toast("Removed from wishlist", "info");
          return list.filter((id) => id !== productId);
        }
        toast("Saved to wishlist");
        return [...list, productId];
      });
    },
    [toast],
  );

  /* ---------------- admin ---------------- */
  const adminLogin = useCallback((email, password) => {
    if (email.trim().toLowerCase() === "admin@sunbabykidswear.com" && password === "admin123") {
      setAdminUser({ email: "admin@sunbabykidswear.com", name: "Vinod" });
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(() => setAdminUser(null), []);

  /* ---------------- admin CRUD ---------------- */
  const saveProduct = useCallback(
    (product) => {
      setProducts((list) => {
        const exists = list.some((p) => p.id === product.id);
        return exists
          ? list.map((p) => (p.id === product.id ? { ...p, ...product } : p))
          : [{ ...product, id: `p${Date.now()}` }, ...list];
      });
      toast("Product saved");
    },
    [toast],
  );

  const deleteProduct = useCallback(
    (id) => {
      setProducts((list) => list.filter((p) => p.id !== id));
      toast("Product deleted", "info");
    },
    [toast],
  );

  const saveCategory = useCallback(
    (category) => {
      setCategories((list) => {
        const exists = list.some((c) => c.id === category.id);
        return exists
          ? list.map((c) => (c.id === category.id ? { ...c, ...category } : c))
          : [...list, { ...category, id: category.slug || `cat${Date.now()}` }];
      });
      toast("Category saved");
    },
    [toast],
  );

  const deleteCategory = useCallback(
    (id) => {
      setCategories((list) => list.filter((c) => c.id !== id));
      toast("Category deleted", "info");
    },
    [toast],
  );

  const saveCoupon = useCallback(
    (coupon) => {
      setCoupons((list) => {
        const exists = list.some((c) => c.id === coupon.id);
        return exists
          ? list.map((c) => (c.id === coupon.id ? { ...c, ...coupon } : c))
          : [...list, { ...coupon, id: `c${Date.now()}` }];
      });
      toast("Coupon saved");
    },
    [toast],
  );

  const deleteCoupon = useCallback(
    (id) => {
      setCoupons((list) => list.filter((c) => c.id !== id));
      toast("Coupon deleted", "info");
    },
    [toast],
  );

  const saveBanner = useCallback(
    (banner) => {
      setBanners((list) => {
        const exists = list.some((b) => b.id === banner.id);
        return exists
          ? list.map((b) => (b.id === banner.id ? { ...b, ...banner } : b))
          : [...list, { ...banner, id: `b${Date.now()}` }];
      });
      toast("Banner saved");
    },
    [toast],
  );

  const deleteBanner = useCallback(
    (id) => {
      setBanners((list) => list.filter((b) => b.id !== id));
      toast("Banner deleted", "info");
    },
    [toast],
  );

  const updateOrderStatus = useCallback(
    (id, status) => {
      setOrders((list) => list.map((o) => (o.id === id ? { ...o, status } : o)));
      toast(`Order ${id} marked ${status}`);
    },
    [toast],
  );

  const placeOrder = useCallback(
    (details) => {
      const number = `SBKW-2026-${10450 + orders.length + 1}`;
      const order = {
        id: number,
        customer: details.name,
        date: new Date().toISOString().slice(0, 10),
        products: cart.map((i) => `${i.name} ×${i.qty}`).join(", "),
        amount: details.total,
        payment: details.payment,
        status: "Pending",
      };
      setOrders((list) => [order, ...list]);
      setLastOrder({ ...order, details });
      setCart([]);
      return order;
    },
    [cart, orders.length],
  );

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const subtotal = cart.reduce((n, i) => n + i.price * i.qty, 0);
  const mrpTotal = cart.reduce((n, i) => n + i.originalPrice * i.qty, 0);
  const discount = mrpTotal - subtotal;
  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 59;

  const value = useMemo(
    () => ({
      products,
      categories,
      banners,
      coupons,
      orders,
      customers,
      settings,
      setSettings,
      cart,
      cartCount,
      subtotal,
      mrpTotal,
      discount,
      delivery,
      total: subtotal + delivery,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      toasts,
      toast,
      adminUser,
      adminLogin,
      adminLogout,
      saveProduct,
      deleteProduct,
      saveCategory,
      deleteCategory,
      saveCoupon,
      deleteCoupon,
      saveBanner,
      deleteBanner,
      updateOrderStatus,
      placeOrder,
      lastOrder,
    }),
    [
      products,
      categories,
      banners,
      coupons,
      orders,
      customers,
      settings,
      cart,
      cartCount,
      subtotal,
      mrpTotal,
      discount,
      delivery,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      toasts,
      toast,
      adminUser,
      adminLogin,
      adminLogout,
      saveProduct,
      deleteProduct,
      saveCategory,
      deleteCategory,
      saveCoupon,
      deleteCoupon,
      saveBanner,
      deleteBanner,
      updateOrderStatus,
      placeOrder,
      lastOrder,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
