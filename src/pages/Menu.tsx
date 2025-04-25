import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Menu = () => {
  const dishes = [
    {
      id: 1,
      name: "Margherita Pizza",
      price: "₹249",
      description: "Classic cheese and tomato pizza.",
    },
    {
      id: 2,
      name: "Butter Chicken",
      price: "₹399",
      description: "Creamy North Indian chicken curry.",
    },
    {
      id: 3,
      name: "Veg Biryani",
      price: "₹299",
      description: "Aromatic basmati rice with vegetables.",
    },
    {
      id: 4,
      name: "Choco Lava Cake",
      price: "₹149",
      description: "Warm gooey chocolate cake.",
    },
    {
      id: 5,
      name: "Paneer Tikka",
      price: "₹299",
      description: "Grilled paneer cubes with spices.",
    },
    {
      id: 6,
      name: "Chicken Shawarma",
      price: "₹199",
      description: "Middle Eastern wrap with grilled chicken.",
    },
    {
      id: 7,
      name: "Masala Dosa",
      price: "₹179",
      description: "South Indian crispy dosa with aloo masala.",
    },
    {
      id: 8,
      name: "Tandoori Chicken",
      price: "₹349",
      description: "Charcoal grilled spiced chicken.",
    },
    {
      id: 9,
      name: "Momos",
      price: "₹129",
      description: "Steamed dumplings served with spicy chutney.",
    },
    {
      id: 10,
      name: "Pasta Alfredo",
      price: "₹269",
      description: "Creamy white sauce pasta.",
    },
    {
      id: 11,
      name: "Chicken Nuggets",
      price: "₹199",
      description: "Crispy deep-fried chicken bites.",
    },
    {
      id: 12,
      name: "Garlic Bread",
      price: "₹149",
      description: "Toasted bread with garlic and herbs.",
    },
    {
      id: 13,
      name: "Cheeseburger",
      price: "₹229",
      description: "Juicy patty with cheese and lettuce.",
    },
    {
      id: 14,
      name: "Cold Coffee",
      price: "₹99",
      description: "Chilled coffee with ice cream.",
    },
    {
      id: 15,
      name: "Rajma Chawal",
      price: "₹199",
      description: "North Indian comfort food combo.",
    },
    {
      id: 16,
      name: "Hakka Noodles",
      price: "₹179",
      description: "Spicy Indo-Chinese noodles.",
    },
    {
      id: 17,
      name: "Gulab Jamun",
      price: "₹89",
      description: "Soft, sweet syrupy dessert balls.",
    },
    {
      id: 18,
      name: "French Fries",
      price: "₹99",
      description: "Golden, crispy potato fries.",
    },
    {
      id: 19,
      name: "Veg Manchurian",
      price: "₹209",
      description: "Fried vegetable balls in tangy sauce.",
    },
    {
      id: 20,
      name: "Falooda",
      price: "₹149",
      description: "Layered dessert with ice cream and vermicelli.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-foodsy-orange/5 to-foodsy-green/10 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar
        cartCount={0}
        onCartClick={() => {
          console.log("Cart clicked");
        }}
      />
      <div className="pl-24 pr-24 pt-8 mx-auto">
        <h1 className="text-5xl font-bold dark:text-white mb-6">Our Menu</h1>
        <ul className="grid sm:grid-cols-2 dark:text-white lg:grid-cols-2 gap-8">
          {dishes.map((dish) => (
            <li
              key={dish.id}
              className="border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-1">{dish.name}</h3>
              <p className="text-gray-500 mb-3">{dish.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{dish.price}</span>
                <button className="bg-orange-500 text-white px-4 py-1.5 rounded hover:bg-orange-600 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Menu;
