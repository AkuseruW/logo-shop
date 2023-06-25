import Navbar from '../navbar';
import TopHeader from './top-head';

const Header = async () => {

    return (
        <header className="">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* @ts-expect-error Server Component */}
                <TopHeader />
            </div>
            <hr />
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8  ">
                <Navbar />
            </nav>
        </header>
    );
}

export default Header