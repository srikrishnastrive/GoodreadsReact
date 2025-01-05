import Logo from 'Assets/Images/logo-color.png';

function Home(){
    return (
       
       
            <div className="flex flex-col items-center justify-around gap-1 h-[100vh]">
                <div className="h-40 w-40">
                    <img 
                    className='w-full h-full' 
                    src= {Logo} alt='logo' />
                </div>
                <div className='flex justify-around items-center gap-16 text-3xl'>
                    <div className='w-2/4 text-center font-semibold basics-1/2'>
                        <h1 className='text-white text-5xl tracking-widest leading-normal'>
                            Book Shelf <br/>
                            <span className='text-warning mt-4'>
                                Your personal library and socail network for bookmarks
                            </span>
                        </h1>
                    </div>
                    <div >
                        <button className='btn btn-primary rounded-md px-5 py-2 text-xl text-white '>Register</button>
                        <button className='btn btn-warning rounded-md px-5 py-2 text-xl text-white mx-3'>Login</button>
                    </div>
                </div>
            </div>
           
        
    )
}

export default Home;
