import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-foodsy-darkGray text-white py-10 px-2 md:px-8 mt-12">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 tracking-wider drop-shadow">Foodsy<span className="text-foodsy-green">.</span></h3>
          <p className="text-gray-100 max-w-xs text-base">
            The best food delivery service in town. Fast, reliable, and delicious.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-3">About</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="#" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800 text-center md:text-left">
        <p className="text-gray-400">© 2025 Foodsy. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}
