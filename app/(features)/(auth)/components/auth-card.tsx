import logo from '../../../../public/images/LOGO.svg';
export default function AuthCardComponent({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className="m-auto flex w-8/12 justify-around rounded-3xl bg-base-300 p-5 opacity-80 max-md:flex-col"
            style={{ height: '30rem' }}
        >
            <img src={logo.src} className="m-auto w-1/3  md:w-1/4" />
            <div className="divider hidden py-24 md:divider-horizontal md:flex "></div>
            {children}
        </div>
    );
}
