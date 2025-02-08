import { create } from "zustand/react";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const ProductStore=create((set)=>({
    products : [
        {
          id: "1",
          name: "Blue Denim Shirt",
          price: 25.00,
          description:
            "A stylish denim shirt for casual outings. Made with high-quality cotton for maximum comfort.",
          sizes: ["S", "M", "L", "XL"],
          colors: ["Blue", "Black", "Gray"],
          images: [img2, img2, img2, img2],
          brand: "Nike",
          rating: { rate: 4.5 },
        },
        {
          id: "2",
          name: "Red Check Shirt For Men",
          price: 30.00,
          description: "Comfortable checkered shirt for everyday wear.",
          sizes: ["S", "M", "L"],
          colors: ["Red", "Black"],
          "brand": "Adidas",
          images: [img3, img3, img3, img2],
          rating: { rate: 4.2 },
        },
        {
          id: "3",
          name: "Casual Black Hoodie",
          price: 20.00,
          description: "Soft cotton hoodie for cold weather.",
          sizes: ["M", "L", "XL"],
          colors: ["Black", "Gray"],
          "brand": "Puma",
          images: [img4, img4, img4, img4],
          rating: { rate: 3.8 },
        },
        {
          id: "4",
          name: "Black Leather Jacket",
          price: 35.00,
          description: "Trendy leather jacket for a bold look.",
          sizes: ["M", "L", "XL"],
          "brand": "Reebok",
          colors: ["Black"],
          images: [img4, img2, img4, img3],
          rating: { rate: 5.0 },
        },
        {
          id: "5",
          name: "White Leather Jacket",
          price: 35.00,
          description: "Trendy leather jacket for a bold look.",
          sizes: ["M", "L", "XL"],
          "brand": "Reebok",
          colors: ["Black"],
          images: [img4, img2, img4, img3],
          rating: { rate: 5.0 },
        },
        {
          id: "6",
          name: "Black Leather Jacket",
          price: 35.00,
          description: "Trendy leather jacket for a bold look.",
          sizes: ["M", "L", "XL"],
          "brand": "Reebok",
          colors: ["Black"],
          images: [img4, img2, img4, img3],
          rating: { rate: 5.0 },
        },
        {
          id: "7",
          name: "Black Leather Jacket",
          price: 35.00,
          description: "Trendy leather jacket for a bold look.",
          sizes: ["M", "L", "XL"],
          "brand": "Reebok",
          colors: ["Black"],
          images: [img4, img2, img4, img3],
          rating: { rate: 5.0 },
        },
        {
          id: "8",
          name: "Black Leather Jacket",
          price: 35.00,
          description: "Trendy leather jacket for a bold look.",
          sizes: ["M", "L", "XL"],
          "brand": "Reebok",
          colors: ["Black"],
          images: [img4, img2, img4, img3],
          rating: { rate: 5.0 },
        },
        {
          id: "9",
          name: "Black Leather Jacket",
          price: 35.00,
          description: "Trendy leather jacket for a bold look.",
          sizes: ["M", "L", "XL"],
          "brand": "Reebok",
          colors: ["Black"],
          images: [img4, img2, img4, img3],
          rating: { rate: 5.0 },
        },
      ]
    
}))

export default ProductStore;