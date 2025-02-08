import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
const FeatureProduct = () => {
  return (
    <div>
      <section className="h-screen  flex justify-center items-start my-8 ">
        <div className="w-[75%]pt-10 mx-auto">
          <h1 className="text-2xl text-center font-bold italic p-3">
            Feature Products
          </h1>
          <div className="grid grid-cols-5 gap-4 mx-2 my-4">
            {[
              {
                img: img2,
                name: "Blue Denim Shirt",
                desc: "A stylish denim shirt for casual outings.",
                price: "$25",
              },
              {
                img: img2,
                name: "Red Check Shirt For Men",
                desc: "Comfortable checkered shirt for everyday wear.",
                price: "$30",
              },
              {
                img: img3,
                name: "Casual Black Hoodie",
                desc: "Soft cotton hoodie for cold weather.",
                price: "$20",
              },
              {
                img: img2,
                name: "White Polo T-Shirt",
                desc: "Classic polo t-shirt for any occasion.",
                price: "$28",
              },
              {
                img: img3,
                name: "Grey Joggers",
                desc: "Comfortable joggers for gym and casual wear.",
                price: "$22",
              },
              {
                img: img4,
                name: "Black Leather Jacket",
                desc: "Trendy leather jacket for a bold look.",
                price: "$35",
              },
              {
                img: img2,
                name: "Navy Blue Jeans",
                desc: "Slim-fit jeans with premium comfort.",
                price: "$27",
              },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-xl p-4 shadow-md text-center transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={product.img}
                  className="w-full h-[200px] rounded-lg"
                  alt={product.name}
                />
                <p className="font-semibold mt-2">{product.name}</p>
                <p className="text-gray-600 text-sm">{product.desc}</p>
                <p className="text-red-500 font-semibold mt-2">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureProduct;
