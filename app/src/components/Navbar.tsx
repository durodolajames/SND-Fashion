import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { trpc } from "@/providers/trpc";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { count } = useCart();

  const { data: categories = [] } = trpc.category.list.useQuery();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const parentCategories = categories.filter((c) => !c.parentId);
  const childCategories = (parentId: number) =>
    categories.filter((c) => c.parentId === parentId);

  return (
    <>
      {/* Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-[#1a1a1a] text-white text-xs text-center py-2.5 px-4 relative">
          <span>
            Up to <strong className="text-[#e85d04]">25%</strong> off curated
            Ankara styles for him and her.{" "}
            <Link to="/shop" className="underline text-[#e85d04] hover:text-white transition-colors">
              Place your order
            </Link>
          </span>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Left - Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {parentCategories.slice(0, 4).map((cat) => (
                <div key={cat.id} className="relative group">
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    className="text-sm text-gray-700 hover:text-black transition-colors flex items-center gap-1 py-2"
                  >
                    {cat.name}
                    {childCategories(cat.id).length > 0 && (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </Link>
                  {childCategories(cat.id).length > 0 && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border">
                      {childCategories(cat.id).map((child) => (
                        <Link
                          key={child.id}
                          to={`/shop?category=${child.slug}`}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <div className="p-6">
                  <SheetClose asChild>
                    <Link to="/" className="text-xl font-semibold tracking-tight block mb-8">
                      House of Aso
                    </Link>
                  </SheetClose>
                  <div className="space-y-1">
                    {parentCategories.map((cat) => (
                      <div key={cat.id}>
                        <SheetClose asChild>
                          <Link
                            to={`/shop?category=${cat.slug}`}
                            className="block py-2.5 text-sm font-medium text-gray-700 hover:text-black"
                          >
                            {cat.name}
                          </Link>
                        </SheetClose>
                        {childCategories(cat.id).map((child) => (
                          <SheetClose key={child.id} asChild>
                            <Link
                              to={`/shop?category=${child.slug}`}
                              className="block py-2 pl-4 text-sm text-gray-500 hover:text-black"
                            >
                              {child.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    ))}
                    <div className="pt-4 border-t mt-4">
                      <SheetClose asChild>
                        <Link to="/about" className="block py-2.5 text-sm font-medium text-gray-700 hover:text-black">
                          About
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Center - Logo */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 text-lg sm:text-xl font-semibold tracking-tight text-black"
            >
              House of Aso
            </Link>

            {/* Right - Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="w-[18px] h-[18px] text-gray-600" />
              </Button>

              {isAuthenticated ? (
                <div className="relative group">
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <User className="w-[18px] h-[18px] text-gray-600" />
                  </Button>
                  <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg py-2 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border z-50">
                    <div className="px-4 py-2 text-sm font-medium border-b">
                      {user?.name || "Account"}
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex"
                  onClick={() => navigate("/login")}
                >
                  <User className="w-[18px] h-[18px] text-gray-600" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="w-[18px] h-[18px] text-gray-600" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#e85d04] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <form
              onSubmit={handleSearch}
              className="absolute top-full left-0 right-0 bg-white border-b shadow-sm px-4 py-3 z-50"
            >
              <div className="max-w-xl mx-auto flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e85d04]/20 focus:border-[#e85d04]"
                  autoFocus
                />
                <Button type="submit" size="sm" className="bg-[#e85d04] hover:bg-[#d15104] text-white">
                  Search
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </form>
          )}
        </nav>
      </header>
    </>
  );
}
