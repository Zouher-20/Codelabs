import empty from '@/public/images/classes/empty-class.svg';
const MainAdminPage = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-2">
            <img src={empty.src} className="w-1/3" />
            <div className='flex flex-col items-center'>
                <p className="text-md">Welecome to the Admin Dashboard</p>
                <p className="text-sm text-gray-500">This page will be implemented later</p>
            </div>
        </div>
    );
};

export default MainAdminPage;
