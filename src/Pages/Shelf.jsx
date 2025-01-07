import Layout from "Layouts/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookShelves } from "Redux/Slices/ShellSlice";
import bookImage from 'Assets/Images/book.jpg'
import { useNavigate } from "react-router-dom";


export default function Shelf (){
    const [activeShelf,setActiveShelf] = useState(null);
    const [books,setBooks] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shelfsState = useSelector((state)=>state.shelf)
    async function  loadShelfs() {
        if (shelfsState.shelfList.length == 0){
            const response = await dispatch(getAllBookShelves());
            console.log(response);
            if(response?.payload?.data?.data?.length > 0){
                setBooks(response?.payload?.data?.data[0].books)
                setActiveShelf(response?.payload?.data?.data[0]._id);
                console.log(response?.payload?.data?.data[0]._id);
            }
        }
    }

    function changeActiveShelf(id){
        setActiveShelf(id);
        shelfsState.shelfList.forEach((shelf)=>{
            if (shelf._id == id){
                setBooks(shelf.books);
            }
        })
    }

    useEffect(()=>{
        loadShelfs();
    },[]);

    return (
        <>
                <Layout>
                        <div className="flex justify-start items-start gap-32">
                            <div className="flex flex-col justify-start items-start">
                            {shelfsState.shelfList && shelfsState.shelfList.length > 0 &&
                                    shelfsState.shelfList.map((shelf) => (
                                        <div key={shelf._id} className="mt-3 mb-3">
                                    <button onClick={()=>changeActiveShelf(shelf._id)}
                                        className={`btn ${activeShelf === shelf._id ? 'btn-primary' : 'btn-warning'} px-2 py-1 text-2xl text-white`}
                                    >
                                    {shelf.name}
                                    </button>
                                        </div>
                                ))
                                }
                            </div>

                    </div>
                    <div className="overflow-x-auto">
                        {books.length > 0 && (
                            <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                            
                                <th>Title</th>
                                <th>description</th>
                                <th>Rating</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                        
                            {books.length > 0 && books.map(book => {
                                return (
                                    <tr key={book._id} onClick={()=>{
                                        navigate("/book/description",{state : {...book}})
                                    }}>
                            
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                src={bookImage}
                                                alt="bookImage " />
                                            </div>
                                            </div>
                                            <div>
                                            <div className="font-bold text-xl">{book?.title}</div>
                                            
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    
                                        <br />
                                        <span className="font-bold text-l">{book?.description}</span>
                                    </td>
                                    <td>{book?.rating}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs hover:bg-primary">details</button>
                                    </th>
                                </tr>
                                )
                            })}
                        
                            </tbody>
                        
                        </table>
                        )}
                        
                    </div>
                </Layout>
        </>
    )
}
