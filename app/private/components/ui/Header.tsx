type HeaderProps = {
    title: string;
};

const Header = ({ title }: HeaderProps) => {
    return (
        <header className="w-full h-auto">
            <div className="px-7 py-7 border-b border-stone-500 bg-stone-800">
                <h2 className="text-xl font-[var(--font-geist-mono)]">{title}</h2>
            </div>
        </header>
    );
};

export default Header;
