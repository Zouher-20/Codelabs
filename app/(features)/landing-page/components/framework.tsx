import IconRenderer from "@/app/components/globals/icon";

const Framework = () => {
    const cards = [
        { icon: 'logos:vue', name: 'Vue' },
        { icon: 'logos:react', name: 'React' },
        { icon: 'logos:vitejs', name: 'Vite' },
        { icon: 'logos:nodejs', name: 'Node' },
        { icon: 'logos:sass', name: 'Sass' },
        { icon: 'fluent:code-text-16-filled', name: 'Even More ...' },

    ]
    return <div className=" mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Get Started Quicker</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Get inspiration from Labs using frameworks, libraries, and design patterns. Then, start your own with premade templates..</p>
        </div>
        <div className="flex flex-row flex-wrap w-[75vw] gap-8 items-center justify-center">
            {cards.map((card) => (
                <div className=" flex flex-col w-48 h-52 justify-center items-center gap-4 p-8 text-white hover:text-primary bg-base-300 rounded-xl hover:scale-[1.1] transition-all ease-in duration-200">
                    <IconRenderer icon={card.icon} width={200} height={200} className="px-6" />
                    <p className="text-center">{card.name}</p>
                </div>
            ))
            }
        </div>
    </div>
}

export default Framework;