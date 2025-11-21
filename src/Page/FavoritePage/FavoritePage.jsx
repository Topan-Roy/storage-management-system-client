import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthProvider";
import {
    FaRegFolder,
    FaRegFilePdf,
    FaRegFileImage,
    FaRegStickyNote,
} from "react-icons/fa";
import { BottomNav, NavItem } from "../HomeScreen/HomeScreen";

export default function FavoritePage() {
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openMenuId, setOpenMenuId] = useState(null);

    const icon = (type) => {
        switch (type) {
            case "image":
                return <FaRegFileImage className="text-green-500 text-2xl" />;
            case "folder":
                return <FaRegFolder className="text-yellow-500 text-2xl" />;
            case "pdf":
                return <FaRegFilePdf className="text-red-500 text-2xl" />;
            case "note":
                return <FaRegStickyNote className="text-purple-500 text-2xl" />;
            default:
                return "📦";
        }
    };
    useEffect(() => {
        if (!email) return;
        const fetchFavorites = async () => {
            try {
                const res = await axios.get(`https://storage-management-system-server.vercel.app/favorites/${email}`);
                setItems(res.data);
            } catch (err) {
                console.error("Favorites fetch failed:", err);
                Swal.fire("Error", "Failed to load favorites.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, [email]);

    const updateItem = (id, key, value) => {
        setItems((prev) => prev.map((item) => (item._id === id ? { ...item, [key]: value } : item)));
    };

    const addItem = (item) => {
        setItems((prev) => [...prev, item]);
    };
    const removeItem = (item) => {
        setItems((prev) => prev.filter((f) => f._id !== item._id));
    };

    const handleAction = async (file, action) => {
        switch (action) {
            case "favorite":
                try {
                    await axios.patch(`https://storage-management-system-server.vercel.app/${file.type}/${file._id}/favorite`, {
                        favorite: !file.favorite,
                        email: file.email,
                    });
                    updateItem(file._id, "favorite", !file.favorite);
                } catch (err) {
                    console.error("Favorite toggle failed:", err);
                    Swal.fire("Failed!", "Something went wrong.", "error");
                }
                break;

            case "rename":
                Swal.fire({
                    title: "Rename File",
                    input: "text",
                    inputLabel: "New name",
                    inputValue: file.name,
                    showCancelButton: true,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.put(`https://storage-management-system-server.vercel.app/rename/${file.type}/${file._id}`, {
                                newName: result.value,
                                email,
                            });
                            updateItem(file._id, "name", result.value);
                            Swal.fire("Renamed!", `${file.name} is now ${result.value}`, "success");
                        } catch (err) {
                            console.error("Rename failed:", err);
                            Swal.fire("Failed!", "Something went wrong.", "error");
                        }
                    }
                });
                break;

            case "duplicate":
                try {
                    const duplicateData = { ...file, name: file.name + " copy" };
                    delete duplicateData._id;
                    const res = await axios.post(`https://storage-management-system-server.vercel.app/upload/${file.type}`, duplicateData);
                    addItem(res.data);
                    Swal.fire("Duplicated!", `${file.name} duplicated successfully.`, "success");
                } catch (err) {
                    console.error("Duplicate failed:", err);
                    Swal.fire("Failed!", "Something went wrong.", "error");
                }
                break;

            case "delete":
                Swal.fire({
                    title: "Are you sure?",
                    text: `Delete ${file.name}?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.delete(`https://storage-management-system-server.vercel.app/delete/${file.type}/${file._id}`);
                            removeItem(file);
                            Swal.fire("Deleted!", `${file.name} has been deleted.`, "success");
                        } catch (err) {
                            console.error("Delete failed:", err);
                            Swal.fire("Failed!", "Something went wrong.", "error");
                        }
                    }
                });
                break;

            default:
                break;
        }
    };

    return (
        <div className="bg-white h-screen w-full flex flex-col px-5">
            <div className="mt-10 mb-4 text-center text-xl font-semibold">Favorites</div>

            <div className="w-full">
                <div className="flex items-center gap-2 border rounded-xl px-3 py-2 text-gray-500">
                    <span className="text-lg">🔍</span>
                    <input
                        type="text"
                        placeholder="Search here"
                        className="outline-none w-full bg-transparent text-[15px]"
                    />
                </div>
            </div>

            <div className="mt-4 space-y-4 overflow-y-auto pb-20">
                {loading ? (
                    <p className="text-gray-500 text-center">Loading favorites...</p>
                ) : items.length === 0 ? (
                    <p className="text-gray-500 text-center">No favorite items found.</p>
                ) : (
                    items.map((item) => (
                        <div key={item._id} className="flex items-center justify-between pr-2 relative">
                            <div className="flex items-center gap-3">
                                {icon(item.type)}
                                <div>
                                    <p className="font-medium text-[15px]">{item.name}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(item.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* 3-dot menu */}
                            <div className="relative">
                                <button
                                    className="text-2xl px-2 text-gray-500"
                                    onClick={() => setOpenMenuId(openMenuId === item._id ? null : item._id)}
                                >
                                    ⋮
                                </button>

                                {openMenuId === item._id && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                                        <button
                                            onClick={() => handleAction(item, "favorite")}
                                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                        >
                                            {item.favorite ? "Unfavorite" : "Favorite"}
                                        </button>
                                        <button
                                            onClick={() => handleAction(item, "rename")}
                                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                        >
                                            Rename
                                        </button>
                                        <button
                                            onClick={() => handleAction(item, "duplicate")}
                                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                        >
                                            Duplicate
                                        </button>
                                        <button
                                            onClick={() => handleAction(item, "delete")}
                                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
                <NavItem />
                <BottomNav />
            </div>
        </div>
    );
}
