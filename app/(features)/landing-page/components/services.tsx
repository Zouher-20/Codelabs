import IconRenderer from "@/app/components/globals/icon";

const Services = () => {
    return <section className="text-gray-400 mt-20 body-font">
        <div className="text-center mb-4">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">The best place to build, test, and discover front-end code</h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">CodeLabs is a social development environment for front-end designers and developers,Build and deploy a website, show off your work, build test cases to learn and debug, and find inspiration.</p>
            <div className="flex mt-6 justify-center">
                <div className="w-16 h-1 rounded-full bg-green-500 inline-flex"></div>
            </div>
        </div>
        <div className="container px-5 pt-12 pb-24 mx-auto">
            <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
                <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-green-400 bg-gray-800 flex-shrink-0">
                    <IconRenderer className="sm:w-16 sm:h-16 w-10 h-10" icon={"solar:test-tube-minimalistic-bold-duotone"} />
                </div>
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                    <h2 className="text-white text-lg title-font font-medium mb-2">Build & Test</h2>
                    <p className="leading-relaxed text-base">Get work done quicker by building out entire projects or isolating code to test features and animations.Want to have grater availability ? Upgrade your plan to Premium account for largest expansion.</p>

                </div>
            </div>
            <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                    <h2 className="text-white text-lg title-font font-medium mb-2">Learn & Discover</h2>
                    <p className="leading-relaxed text-base">Want to upgrade your skills and get noticed? Participating in CodeLabs Challenges is a great way to try something new. We frequently feature these Lab on our homepage and across social media!.</p>
                </div>
                <div className="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full text-green-400 bg-gray-800 flex-shrink-0">
                    <IconRenderer className="sm:w-16 sm:h-16 w-10 h-10" icon={"simple-icons:openstreetmap"} />
                </div>
            </div>
            <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
                <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-green-400 bg-gray-800 flex-shrink-0">
                    <IconRenderer className="sm:w-16 sm:h-16 w-10 h-10" icon={"carbon:ibm-watsonx-code-assistant-for-z-refactor"} />
                </div>
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                    <h2 className="text-white text-lg title-font font-medium mb-2">Share Your Work</h2>
                    <p className="leading-relaxed text-base">Become a part of active front-end community by sharing work. Presenting at a conference? Show your code directly in the browser with Presentation Mode..</p>
                </div>
            </div>
            <button className="btn btn-primary flex mx-auto mt-20  bg-primary border-0 py-2 px-8 focus:outline-none text-lg rounded-xl">Try Now</button>
        </div>
    </section>
}

export default Services;