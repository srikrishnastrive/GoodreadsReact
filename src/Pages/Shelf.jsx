import Layout from "Layouts/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShelf, getAllBookShelves } from "Redux/Slices/ShelfSlice";
import bookImage from 'Assets/Images/book.jpg';
import { useNavigate } from "react-router-dom";

export default function Shelf() {
    const [activeShelf, setActiveShelf] = useState(null);
    const [books, setBooks] = useState([]);
    const [shelfInput, setShelfInput] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shelfsState = useSelector((state) => state.shelf);

    async function loadShelfs() {
        if (shelfsState.shelfList.length === 0) {
            const response = await dispatch(getAllBookShelves());
            if (response?.payload?.data?.data?.length > 0) {
                setBooks(response.payload.data.data[0].books);
                setActiveShelf(response.payload.data.data[0]._id);
            }
        } else if (shelfsState.shelfList.length > 0) {
            setBooks(shelfsState.shelfList[0].books);
            setActiveShelf(shelfsState.shelfList[0]._id);
        }
    }

    function changeActiveShelf(id) {
        setActiveShelf(id);
        shelfsState.shelfList.forEach((shelf) => {
            if (shelf._id === id) {
                setBooks(shelf.books);
            }
        });
    }

    useEffect(() => {
        loadShelfs();
    }, []);

    return (
        <Layout>
            <div className="flex justify-start items-start gap-32 p-4">
                {/* Sidebar */}
                <div className="flex flex-col justify-start items-start">
                    {shelfsState.shelfList?.length > 0 &&
                        shelfsState.shelfList.map((shelf) => (
                            <div key={shelf._id} className="mt-3 mb-3">
                                <button
                                    onClick={() => changeActiveShelf(shelf._id)}
                                    className={`btn ${
                                        activeShelf === shelf._id ? 'btn-primary' : 'btn-warning'
                                    } px-2 py-1 text-2xl text-white`}
                                >
                                    {shelf.name}
                                </button>
                            </div>
                        ))}
                    {/* Add New Shelf */}
                    <div>
                        <input
                            className="p-4 bg-white rounded-sm mb-4 text-black"
                            placeholder="Shelf name"
                            onChange={(e) => setShelfInput(e.target.value)}
                            value={shelfInput}
                        />
                        <button
                            className="btn btn-secondary block px-4 py-2"
                            onClick={async () => {
                                await dispatch(createShelf({ shelfName: shelfInput }));
                                await dispatch(getAllBookShelves());
                                setShelfInput('');
                            }}
                        >
                            Create New Shelf
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto w-full">
                    <table className="table table-fixed w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="w-1/4">Title</th>
                                <th className="w-1/2">Description</th>
                                <th className="w-1/6">Rating</th>
                                <th className="w-1/6"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length > 0 ? (
                                books.map((book) => (
                                    <tr
                                        key={book._id}
                                        className="hover:bg-slate-700"
                                        onClick={() => {
                                            navigate('/book/description', { state: { ...book } });
                                        }}
                                    >
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img src={bookImage} alt="Book" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-xl">{book?.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="font-bold text-l">{book?.description}</span>
                                        </td>
                                        <td>{book?.rating}</td>
                                        <td>
                                            <button className="btn btn-ghost btn-xs hover:bg-primary">
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        No books available in this shelf.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
