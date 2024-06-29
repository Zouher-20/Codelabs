import Image from 'next/image';

const Footr = () => {
    return <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <div className="flex justify-start px-4">
                <Image src="/logo-title.svg" width={150} height={35} alt="logo" />
            </div>
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2024 CodeLabs —
                <a className="text-gray-600 ml-1">@Damascus University</a>
            </p>

        </div>
    </footer>
}

export default Footr;