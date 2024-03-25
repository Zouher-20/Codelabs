import background from '../../../public/background/auth-background.svg';

export default function AuthPage({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className="flex h-screen justify-center"
            style={{ backgroundImage: `url(${background.src})`, backgroundSize: 'cover' }}
        >
            {children}
        </div>
    );
}
