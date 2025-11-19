import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { BsSearch, BsTextRight } from "react-icons/bs";
import { FaRegFolder, FaRegFilePdf, FaRegFileImage, FaRegStickyNote } from "react-icons/fa";
import { MdStorage, MdLockOutline } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router";
import { AuthContext } from "../../Contexts/AuthProvider";

export default function HomeScreen() {
  const TOTAL_STORAGE = 15 * 1024; // 15 GB → MB
  const [usedStorage, setUsedStorage] = useState(0);

  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [recentFiles, setRecentFiles] = useState([]);
  const [open, setOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const email = user?.email;
  const availableStorage = TOTAL_STORAGE - usedStorage;

  // ---------- FETCH DATA ----------
  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      try {
        const [imgRes, pdfRes, noteRes, folderRes] = await Promise.all([
          axios.get(`http://localhost:3000/images/${email}`),
          axios.get(`http://localhost:3000/pdfs/${email}`),
          axios.get(`http://localhost:3000/notes/${email}`),
          axios.get(`http://localhost:3000/folders/${email}`),
        ]);

        const allImages = imgRes.data.map(f => ({ ...f, type: "image", icon: <FaRegFileImage className="text-green-500" /> }));
        const allPdfs = pdfRes.data.map(f => ({ ...f, type: "pdf", icon: <FaRegFilePdf className="text-red-500" /> }));
        const allNotes = noteRes.data.map(f => ({ ...f, type: "note", icon: <FaRegStickyNote className="text-purple-500" /> }));
        const allFolders = folderRes.data.map(f => ({ ...f, type: "folder", icon: <FaRegFolder className="text-yellow-500" /> }));

        setImages(allImages);
        setPdfs(allPdfs);
        setNotes(allNotes);
        setFolders(allFolders);

        const allFiles = [...allImages, ...allPdfs, ...allNotes, ...allFolders]
          .map(f => ({ ...f, date: new Date(f.date).toDateString() }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setRecentFiles(allFiles);

        const used =
          allImages.reduce((a, b) => a + Number(b.size), 0) +
          allPdfs.reduce((a, b) => a + Number(b.size), 0) +
          allNotes.reduce((a, b) => a + Number(b.size), 0) +
          allFolders.reduce((a, b) => a + Number(b.size || 0), 0);

        setUsedStorage(used);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [email]);

  // ---------- UPLOAD ----------
  const uploadHandler = async (file, type) => {
    if (!file) return;

    let fileSizeMB = type === "folder" ? 0 : file.size / (1024 * 1024);

    if (usedStorage + fileSizeMB > TOTAL_STORAGE) {
      Swal.fire("Storage full!", "", "error");
      return;
    }

    const newItem = {
      name: file.name || file.name,
      size: fileSizeMB.toFixed(2),
      email,
      type,
      date: new Date(),
    };

    try {
      const res = await axios.post(`http://localhost:3000/upload/${type}`, newItem);
      const itemWithIcon = { ...res.data, icon: getFileIcon(type) };

      if (type === "image") setImages(prev => [itemWithIcon, ...prev]);
      if (type === "pdf") setPdfs(prev => [itemWithIcon, ...prev]);
      if (type === "note") setNotes(prev => [itemWithIcon, ...prev]);
      if (type === "folder") setFolders(prev => [itemWithIcon, ...prev]);

      setRecentFiles(prev => [itemWithIcon, ...prev]);
      setUsedStorage(prev => prev + fileSizeMB);

      Swal.fire("Uploaded!", `${file.name} uploaded successfully.`, "success");
    } catch (err) {
      console.error("Upload failed:", err);
      Swal.fire("Upload failed!", "Something went wrong.", "error");
    }
  };

  const handleSelect = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "note" && !file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
      Swal.fire("Invalid file", "Only Excel files allowed for Notes!", "error");
      return;
    }
    if (type === "image" && !file.type.startsWith("image/")) {
      Swal.fire("Invalid file", "Only Image files allowed!", "error");
      return;
    }
    if (type === "pdf" && file.type !== "application/pdf") {
      Swal.fire("Invalid file", "Only PDF files allowed!", "error");
      return;
    }

    uploadHandler(file, type);
  };

  const createFolderHandler = () => {
    const name = prompt("Enter folder name:");
    if (!name) return;

    const newFolder = { name, email, type: "folder", size: 0 };
    uploadHandler(newFolder, "folder");
  };

  const getFileIcon = type => {
    switch (type) {
      case "image": return <FaRegFileImage className="text-green-500" />;
      case "pdf": return <FaRegFilePdf className="text-red-500" />;
      case "note": return <FaRegStickyNote className="text-purple-500" />;
      case "folder":
      default: return <FaRegFolder className="text-yellow-500" />;
    }
  };

  const handleAction = async (file, action) => {
  switch (action) {

    // ✅ FAVORITE SYSTEM (DB + UI)
    case "favorite":
  try {
    await axios.patch(`http://localhost:3000/${file.type}/${file._id}/favorite`, {
      favorite: !file.favorite,
      email: file.email
    });

    setRecentFiles(prev =>
      prev.map(f => f._id === file._id ? { ...f, favorite: !f.favorite } : f)
    );
  } catch (err) {
    console.error("Favorite toggle failed:", err);
    Swal.fire("Failed!", "Something went wrong.", "error");
  }
  break;

    // ✅ RENAME
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
            if (!file.type) file.type = "folder";

            await axios.put(`http://localhost:3000/rename/${file.type}/${file._id}`, {
              newName: result.value,
              email
            });

            updateState(file._id, "name", result.value);

            Swal.fire("Renamed!", `${file.name} is now ${result.value}`, "success");
          } catch (err) {
            console.error("Rename failed:", err);
            Swal.fire("Failed!", "Something went wrong.", "error");
          }
        }
      });
      break;

    // ✅ DUPLICATE
    case "duplicate":
      try {
        const duplicateData = { ...file, name: file.name + " copy", _id: undefined };
        const res = await axios.post(`http://localhost:3000/upload/${file.type}`, duplicateData);

        const newFile = { ...res.data, icon: getFileIcon(file.type) };
        addFileToState(newFile);

        Swal.fire("Duplicated!", `${file.name} duplicated successfully.`, "success");
      } catch (err) {
        console.error("Duplicate failed:", err);
        Swal.fire("Failed!", "Something went wrong.", "error");
      }
      break;

    // ✅ DELETE
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
            await axios.delete(`http://localhost:3000/delete/${file.type}/${file._id}`);

            removeFileFromState(file);

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

  function formatSize(sizeInMB) {
    if (sizeInMB < 1) {
      return `${(sizeInMB * 1024).toFixed(2)} KB`;
    } else if (sizeInMB < 1024) {
      return `${sizeInMB.toFixed(2)} MB`;
    } else {
      return `${(sizeInMB / 1024).toFixed(2)} GB`;
    }
  }


  // HELPER FUNCTIONS
  const updateState = (id, key, value) => {
    setImages(prev => prev.map(f => f._id === id ? { ...f, [key]: value } : f));
    setPdfs(prev => prev.map(f => f._id === id ? { ...f, [key]: value } : f));
    setNotes(prev => prev.map(f => f._id === id ? { ...f, [key]: value } : f));
    setFolders(prev => prev.map(f => f._id === id ? { ...f, [key]: value } : f));
    setRecentFiles(prev => prev.map(f => f._id === id ? { ...f, [key]: value } : f));
  };

  const addFileToState = (file) => {
    const size = Number(file.size);
    setRecentFiles(prev => [file, ...prev]);
    setUsedStorage(prev => prev + size);

    if (file.type === "image") setImages(prev => [file, ...prev]);
    if (file.type === "pdf") setPdfs(prev => [file, ...prev]);
    if (file.type === "note") setNotes(prev => [file, ...prev]);
    if (file.type === "folder") setFolders(prev => [file, ...prev]);
  };

  const removeFileFromState = (file) => {
    const size = Number(file.size);
    setRecentFiles(prev => prev.filter(f => f._id !== file._id));
    setUsedStorage(prev => prev - size);

    if (file.type === "image") setImages(prev => prev.filter(f => f._id !== file._id));
    if (file.type === "pdf") setPdfs(prev => prev.filter(f => f._id !== file._id));
    if (file.type === "note") setNotes(prev => prev.filter(f => f._id !== file._id));
    if (file.type === "folder") setFolders(prev => prev.filter(f => f._id !== file._id));
  };

  return (
    <div className="relative min-h-screen bg-white mx-auto max-w-[390px] pb-24">
      {/* HEADER */}
      <div className="flex justify-between items-center px-5 pt-5 mb-4">
        <h1 className="text-3xl font-bold">Jotter</h1>
        <MdLockOutline className="text-xl text-black" />
      </div>

      {/* SEARCH */}
      <div className="relative px-5 mb-5">
        <input type="text" placeholder="Search here" className="w-full py-3 pl-10 pr-12 rounded-xl bg-[#F6F6F6]" />
        <BsSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-500" />
        <BsTextRight className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-700 text-lg" />
      </div>

      {/* STORAGE BOX */}
      {/* STORAGE BOX */}
      <div className="px-5 mb-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-[#F3F3F3] rounded-xl p-4 shadow-sm flex gap-3 items-start">
            <MdStorage className="text-3xl text-black" />
            <div className="flex-1">
              <p className="text-xs font-medium">
                Total Storage: <b>{formatSize(TOTAL_STORAGE)}</b>
              </p>
              <p className="text-xs text-gray-600">
                Used: {formatSize(usedStorage)}
              </p>
              <p className="text-xs text-gray-600">
                Available: {formatSize(availableStorage)}
              </p>
              <div className="w-full bg-gray-200 h-2 mt-1 rounded-full">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(usedStorage / TOTAL_STORAGE) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-[#F3F3F3] rounded-xl p-4 shadow-sm flex gap-3 items-start">
            <Link to="/folder">
              <FaRegFolder className="text-3xl text-yellow-500" />
              <div>
                <h4 className="text-sm font-semibold">Folders</h4>
                <p className="text-xs text-gray-600">Total items: {folders.length}</p>
                <p className="text-xs text-gray-600">
                  Storage: {formatSize(folders.reduce((a, b) => a + Number(b.size || 0), 0))}
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Link to="/notespage">
            <CategoryCard
              icon={<FaRegStickyNote className="text-3xl text-purple-600" />}
              title="Notes"
              files={notes}
            />
          </Link>
          <Link to="/imagespage">
            <CategoryCard
              icon={<FaRegFileImage className="text-3xl text-green-600" />}
              title="Images"
              files={images}
            />
          </Link>
          <Link to="/pdfpage">
            <CategoryCard
              icon={<FaRegFilePdf className="text-3xl text-red-500" />}
              title="PDF"
              files={pdfs}
            />
          </Link>

        </div>
      </div>



      {/* RECENT FILES */}
      <div className="px-5 mt-2">
        <h2 className="text-lg font-semibold mb-2">Recent</h2>
        {recentFiles.length === 0 && <p className="text-sm text-gray-500">No files uploaded yet.</p>}
        {recentFiles.map(file => <RecentItem key={file._id || file.id} file={file} handleAction={handleAction} />)}
      </div>

      <BottomNav open={open} setOpen={setOpen} handleSelect={handleSelect} createFolderHandler={createFolderHandler} />
    </div>
  );
}

// CATEGORY CARD
// Size formatter
function formatSize(sizeInMB) {
  if (sizeInMB < 1) {
    return `${(sizeInMB * 1024).toFixed(2)} KB`;
  } else if (sizeInMB < 1024) {
    return `${sizeInMB.toFixed(2)} MB`;
  } else {
    return `${(sizeInMB / 1024).toFixed(2)} GB`;
  }
}

// CategoryCard
function CategoryCard({ icon, title, files }) {
  const totalSize = files.reduce((sum, f) => sum + Number(f.size || 0), 0);

  return (
    <div className="bg-[#F3F3F3] rounded-xl p-3 shadow-sm flex flex-col items-center">
      {icon}
      <h4 className="text-sm font-semibold mt-1">{title}</h4>
      <p className="text-xs text-gray-600">{files.length} items</p>
      <p className="text-xs text-gray-600">{formatSize(totalSize)}</p>
    </div>
  );
}



// RECENT ITEM
function RecentItem({ file, handleAction }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex items-center justify-between py-3 relative">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{file.icon}</div>
        <div>
          <p className="font-medium text-sm">{file.name}</p>
          <p className="text-xs text-gray-400">{`${file.size || 0} MB • ${file.date}`}</p>
        </div>
      </div>

      <div className="relative">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl">⋮</button>
        {menuOpen && (
          <div className="absolute right-0 top-6 bg-white shadow-lg rounded-lg py-2 w-36 z-10">
            <button onClick={() => { handleAction(file, "favorite"); setMenuOpen(false); }} className="block w-full text-left px-3 py-1 hover:bg-gray-100">{file.favorite ? "Unfavorite" : "Favorite"}</button>
            <button onClick={() => { handleAction(file, "rename"); setMenuOpen(false); }} className="block w-full text-left px-3 py-1 hover:bg-gray-100">Rename</button>
            <button onClick={() => { handleAction(file, "duplicate"); setMenuOpen(false); }} className="block w-full text-left px-3 py-1 hover:bg-gray-100">Duplicate</button>
            <button onClick={() => { handleAction(file, "delete"); setMenuOpen(false); }} className="block w-full text-left px-3 py-1 hover:bg-gray-100 text-red-500">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

// BOTTOM NAV
export function BottomNav({ open, setOpen, handleSelect, createFolderHandler }) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white">
      <div className="border-t bg-white relative flex justify-between px-10 py-3">
        <Link to='/homescreen'><NavItem icon="🏠" label="Home" active /></Link>
        <Link to="/favorite">
          <NavItem icon="🔖" label="Favorite" />
        </Link>
        <button onClick={() => setOpen(!open)} className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-3xl">{open ? "✕" : "+"}</button>
        <Link to="/calendar">
        <NavItem icon="📅" label="Calender" />
        </Link>
        
        <Link to="/profilepage"><NavItem icon="👤" label="Profile" /></Link>
      </div>

      {open && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-xl p-3 w-52">
          <button onClick={createFolderHandler} className="block w-full text-center py-2">Create Folder</button>
          <label className="py-2 text-center block cursor-pointer">
            <input type="file" accept=".xls,.xlsx" className="hidden" onChange={(e) => handleSelect(e, "note")} />Add Note (Excel)
          </label>
          <label className="py-2 text-center block cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSelect(e, "image")} />Import Image
          </label>
          <label className="py-2 text-center block cursor-pointer">
            <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleSelect(e, "pdf")} />Import PDF
          </label>
        </div>
      )}
    </div>
  );
}

// NAV ITEM
export function NavItem({ icon, label, active }) {
  return (
    <div className={`flex flex-col items-center text-sm ${active ? "text-black" : "text-gray-400"}`}>
      <span className="text-xl">{icon}</span>
      {label}
    </div>
  );
}
