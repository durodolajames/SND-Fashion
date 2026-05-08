import { Link } from "react-router";
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* Ankara Pattern Stripe */}
      <div className="ankara-stripe h-16 sm:h-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Rooted in Heritage.
            </h3>
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
              Designed for Today.
            </h3>
            <NewsletterForm />
          </div>

          {/* Company */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Terms of service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Social
            </h4>
            <div className="flex gap-2">
              {[Twitter, Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#e85d04] text-white flex items-center justify-center hover:bg-[#d15104] transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Large Logo */}
        <div className="mt-16 sm:mt-20 text-center overflow-hidden">
          <div className="relative inline-block">
            <span className="text-[60px] sm:text-[100px] lg:text-[140px] font-bold text-gray-900 leading-none tracking-tight select-none">
              House of Aso
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            &copy; House of Aso {new Date().getFullYear()}. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
