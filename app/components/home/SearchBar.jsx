import { Search, MapPin } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="bg-slate-300 rounded-full p-2 max-w-lg">
      <div className="bg-white rounded-full py-1 px-2 shadow-xl flex items-center justify-between">
        <MapPin size={18} className="text-slate-800" />

        <input
          type="text"
          className="flex-1 w-full px-2 text-sm rounded-full text-gray-600 border-none focus:outline-none focus:ring-0"
          placeholder="Pencarian"
        />

        <button className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-600 transition">
          <Search size={16} />
        </button>
      </div>
    </div>
  );
}
