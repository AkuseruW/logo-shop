import TopHeader from './top-head';
import Navbar from '../navbar';

export default function Header() {
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
