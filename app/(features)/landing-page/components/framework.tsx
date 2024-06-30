import IconRenderer from '@/app/components/globals/icon';

const Framework = () => {
    const cards = [
        { icon: 'logos:vue', name: 'Vue' },
        { icon: 'logos:react', name: 'React' },
        { icon: 'logos:vitejs', name: 'Vite' },
        { icon: 'logos:nodejs', name: 'Node' },
        { icon: 'logos:sass', name: 'Sass' },
        { icon: 'fluent:code-text-16-filled', name: 'Even More ...' }
    ];
    return (
        <div id="Frameworks" className="mx-auto pt-16">
            <div className="mb-20 flex w-full flex-col text-center">
                <h1 className="title-font mb-4 text-2xl font-medium text-white sm:text-3xl">
                    Get Started Quicker
                </h1>
                <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                    Get inspiration from Labs using frameworks, libraries, and design patterns.
                    Then, start your own with premade templates..
                </p>
            </div>
            <div className="flex w-[75vw] flex-row flex-wrap items-center justify-center gap-8">
                {cards.map(card => (
                    <div className=" flex h-52 w-48 flex-col items-center justify-center gap-4 rounded-xl bg-base-300 p-8 text-white transition-all duration-200 ease-in hover:scale-[1.1] hover:text-primary">
                        <IconRenderer icon={card.icon} width={200} height={200} className="px-6" />
                        <p className="text-center">{card.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Framework;
