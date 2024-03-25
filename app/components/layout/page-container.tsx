import Navbar from './navbar';
import Sidebar from './sidebar';
export default function PageContainer({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex items-start">
            <Sidebar />
            <div className="flex w-full flex-col">
                <Navbar />
                <div className="bg-base-300">
                    <main className="main-page-container container mx-auto bg-base-300">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
