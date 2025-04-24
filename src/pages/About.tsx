import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import Footer from '@/components/Footer';

const About = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-foodsy-orange/5 to-foodsy-green/10 transition-colors duration-300">
      <div className="absolute top-5 right-6 z-50">
        <ThemeToggle />
      </div>
      <Navbar cartCount={0} onCartClick={() => {}} />
      
      <div className="container mx-auto py-10 px-4 md:px-6">
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">About Foodsy</h1>
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg">
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              Welcome to Foodsy, where culinary excellence meets convenience. Founded in 2025, we've 
              revolutionized the way people experience food delivery in India.
            </p>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              Our mission is simple: to connect hungry customers with the best local restaurants, 
              ensuring that delicious meals reach your doorstep quickly and in perfect condition.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              With a curated selection of top-rated restaurants and a seamless ordering process, 
              we've made food delivery an enjoyable experience for thousands of satisfied customers.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300">
              To be the most beloved food delivery platform in India, known for exceptional 
              service, diverse culinary options, and innovation in the food delivery space.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Quality and safety in every delivery</li>
              <li>Customer satisfaction above all</li>
              <li>Support for local restaurants and communities</li>
              <li>Innovation in food delivery technology</li>
              <li>Sustainability and environmental responsibility</li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Why Choose Foodsy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-foodsy-orange">Fast Delivery</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our optimized delivery network ensures your food arrives hot and fresh in record time.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-foodsy-orange">Wide Selection</h3>
              <p className="text-gray-700 dark:text-gray-300">
                From local favorites to international cuisine, we offer a diverse range of culinary options.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-foodsy-orange">Exceptional Service</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our customer service team is always ready to ensure your experience is nothing short of amazing.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Order?</h2>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've made Foodsy their go-to food delivery service.
          </p>
          <Link 
            to={isAuthenticated ? "/" : "/login"} 
            className="inline-block bg-foodsy-orange hover:bg-foodsy-orange/90 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all"
          >
            {isAuthenticated ? "Order Now" : "Sign In to Order"}
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
