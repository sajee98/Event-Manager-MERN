import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Card from "../../Components/Card/Card";
import axios from "axios";

export default function Planners() {
  const [vendors, setVendors] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const categories = ["All", "Catering", "Photography", "Decoration", "Music", "Venues", "Makeup"];

  useEffect(() => {
    let mounted = true;
    const fetchVendors = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/vendor");
        if (mounted) setVendors(data || []);
      } catch (err) {
        console.error("Error fetching vendors:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchVendors();
    return () => (mounted = false);
  }, []);

  // Derived / filtered vendors
  const filtered = useMemo(() => {
    let result = vendors;
    if (category && category !== "All") {
      result = result.filter((p) => (p.category || "").toLowerCase() === category.toLowerCase());
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((p) => (p.title || p.name || "").toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q));
    }

    if (sort === "newest") result = result.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === "popular") result = result.slice().sort((a, b) => (b.views || 0) - (a.views || 0));
    if (sort === "featured") result = result.slice().sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return result;
  }, [vendors, category, query, sort]);

  const visible = viewAll ? filtered : filtered.slice(0, 12);
  const featured = vendors?.filter((p) => p.featured).slice(0, 4) || [];

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[320px]">
        <div className="text-center">
          <div className="animate-pulse h-6 w-48 bg-gray-200 rounded mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading planners…</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-white pb-[10px] bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/background-leaf-pattern-design-template_483537-2317.jpg?semt=ais_incoming&w=740&q=80')",
      }}
    >
      <div className="lg:container mx-auto px-4 md:px-0">
        {/* Header / Hero */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Event Planners</h1>
            <span className="block w-44 h-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full mt-4"></span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/vendor" className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-2xl shadow">Become a Vendor</Link>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-8 bg-white/60 backdrop-blur rounded-2xl p-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
            <div className="flex-1">
              <label className="sr-only">Search</label>
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search planners, services, or keywords..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </div>
            </div>

          </div>

          {/* category chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1 rounded-full text-sm ${category === c ? 'bg-pink-500 text-white' : 'bg-white border'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

      

        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {visible.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500">No planners match your search.</div>
          ) : (
            visible.map((vendor) => <Card key={vendor._id || vendor.id} vendor={vendor} />)
          )}
        </div>

      </div>

  
    </div>
  );
}
