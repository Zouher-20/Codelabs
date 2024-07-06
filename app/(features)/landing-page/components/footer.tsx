import Image from 'next/image';

const Footr = () => {
    return (
        <footer className="body-font text-gray-600">
            <div className="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
                <div className="flex justify-start px-4">
                    <Image src="/logo-title.svg" width={150} height={35} alt="logo" />
                </div>
                <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">
                    © 2024 CodeLabs —<a className="ml-1 text-gray-600">@Damascus University</a>
                </p>
            </div>
        </footer>
    );
};

export default Footr;
