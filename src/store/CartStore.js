import { create } from "zustand";


const CartStore=create((set)=>({
    carts: [
        {
          id: 1,
          productId: 1,
          quantity: 1,
         
        },
        {
          id: 2,
          productId: 2,
          quantity: 3,
          
        },
      ],

      addCart: (newCart) => set((state) => ({
        carts: [...state.carts, newCart]
      })),
      
      increaseQuantity: (id) =>
        set((state)=>({
          carts:state.carts.map((el)=>
            el.id === id ? {...el, quantity:el.quantity + 1} : el 
        ),
        })),
      decreaseQuantity: (id) =>
        set((state)=>({
          carts:state.carts.map((el)=>
            el.id === id ? {...el, quantity:el.quantity - 1} : el 
        ),
        })),
        removeHandle:(id)=>
          set((state)=>({carts:state.carts.filter((el)=>el.id !== id)}))
}));

export default CartStore;