import { useState, useRef } from "react";
import axios from "axios";
import { BottomNav, NavItem } from "../HomeScreen/HomeScreen";

export default function Calendar({ userEmail }) {
  const [items, setItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [month, setMonth] = useState("November");
  const [year, setYear] = useState(2025);
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const years = [2024, 2025, 2026];

  const datesRef = useRef(null);

  const icon = (type) => {
    switch(type){
      case "image": return "🖼️";
      case "pdf": return "📄";
      case "note": return "📝";
      case "folder": return "📁";
      default: return "📦";
    }
  };

  // Fetch items from backend filtered by day
  const fetchItemsByDate = async (date) => {
    if(!date) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/items/${userEmail}`);
      const allItems = res.data;
      // Filter in frontend by selected date
      const filtered = allItems.filter(item => {
        if(!item.date) return false;
        const d = new Date(item.date);
        const sel = new Date(date);
        return d.getFullYear() === sel.getFullYear() &&
               d.getMonth() === sel.getMonth() &&
               d.getDate() === sel.getDate();
      });
      setItems(filtered);
    } catch(err){
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const lastDay = new Date(year, months.indexOf(month)+1, 0).getDate();
  const dates = Array.from({length: lastDay}, (_, i)=>i+1);

  const scrollDates = (dir)=>{
    if(datesRef.current){
      datesRef.current.scrollBy({ left: dir==="left"?-120:120, behavior:"smooth"});
    }
  };

  return (
    <div className="bg-white h-screen w-full flex flex-col px-5">
      <div className="mt-10 mb-4 text-center text-xl font-semibold">Calendar</div>

      {/* Month & Year Selector */}
      <div className="flex items-center gap-4 mb-3">
        <div className="relative">
          <div className="cursor-pointer px-3 py-1 border rounded" onClick={()=>setMonthOpen(!monthOpen)}>
            {month} ⌄
          </div>
          {monthOpen && (
            <div className="absolute bg-white shadow-lg rounded mt-1 z-10">
              {months.map(m=>(
                <div key={m} className="px-4 py-1 hover:bg-gray-100 cursor-pointer" 
                     onClick={()=>{ setMonth(m); setMonthOpen(false); }}>
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="cursor-pointer px-3 py-1 border rounded" onClick={()=>setYearOpen(!yearOpen)}>
            {year} ⌄
          </div>
          {yearOpen && (
            <div className="absolute bg-white shadow-lg rounded mt-1 z-10">
              {years.map(y=>(
                <div key={y} className="px-4 py-1 hover:bg-gray-100 cursor-pointer" 
                     onClick={()=>{ setYear(y); setYearOpen(false); }}>
                  {y}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Weekdays */}
      <div className="flex justify-between text-center text-[13px] mb-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
          <div key={d} className="w-full text-gray-600">{d}</div>
        ))}
      </div>

      {/* Dates Horizontal Scroll */}
      <div className="flex items-center gap-2 mb-4 py-2">
        <button className="px-2 text-gray-500 font-bold" onClick={()=>scrollDates("left")}>◀</button>
        <div ref={datesRef} className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
          {dates.map(day=>{
            const monthIndex = months.indexOf(month)+1;
            const dateStr = `${year}-${String(monthIndex).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
            const isSelected = selectedDate === dateStr;
            return (
              <div key={day} className={`cursor-pointer  p-2 rounded-full text-center ${isSelected?"bg-yellow-400 text-white font-semibold":"text-gray-600"}`}
                   onClick={()=>{ setSelectedDate(dateStr); fetchItemsByDate(dateStr); }}>
                {day}
              </div>
            )
          })}
        </div>
        <button className="px-2 text-gray-500 font-bold" onClick={()=>scrollDates("right")}>▶</button>
      </div>

      {/* Item List */}
      <div className="mt-2 space-y-4 overflow-y-auto pb-20">
        {loading ? <p className="text-center mt-10">Loading...</p> :
          items.length===0 ? (
            <p className="text-center text-gray-500">{selectedDate ? `No items for ${selectedDate}` : "Select a date"}</p>
          ) : (
            items.map(item=>(
              <div key={item._id} className="flex items-center justify-between pr-2 bg-gray-50 rounded-lg p-2 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{icon(item.type)}</div>
                  <div>
                    <p className="font-medium text-[15px]">{item.name}</p>
                    <p className="text-xs text-gray-400">{new Date(item.date).toDateString()}</p>
                  </div>
                </div>
                <button className="text-2xl px-2 text-gray-500">⋮</button>
              </div>
            ))
          )
        }
        <NavItem />
              <BottomNav />
      </div>
    </div>
  )
}
