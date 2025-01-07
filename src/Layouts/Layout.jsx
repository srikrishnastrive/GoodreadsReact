import Footer from "Components/Footer/Footer";
import Navbar from "Components/NavBar/Navbar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex-grow flex items-start justify-center">
                {children}
            </div>
            <Footer />
        </>
    );
}
