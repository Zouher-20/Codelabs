import IconRenderer from '@/app/components/globals/icon';
import Link from 'next/link';

const Services = () => {
    return (
        <section id="Services" className="body-font mt-12 pt-16 text-gray-400">
            <div className="mb-4 text-center">
                <h1 className="title-font mb-4 text-2xl font-medium text-white sm:text-3xl">
                    The best place to build, test, and discover front-end code
                </h1>
                <p className="mx-auto text-base leading-relaxed text-gray-400 text-opacity-80 lg:w-3/4 xl:w-2/4">
                    CodeLabs is a social development environment for front-end designers and
                    developers,Build and deploy a website, show off your work, build test cases to
                    learn and debug, and find inspiration.
                </p>
                <div className="mt-6 flex justify-center">
                    <div className="inline-flex h-1 w-16 rounded-full bg-green-500"></div>
                </div>
            </div>
            <div className="container mx-auto px-5 pb-24 pt-12">
                <div className="mx-auto mb-10 flex flex-col items-center border-b border-gray-800 pb-10 sm:flex-row lg:w-3/5">
                    <div className="inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-green-400 sm:mr-10 sm:h-32 sm:w-32">
                        <IconRenderer
                            className="h-10 w-10 sm:h-16 sm:w-16"
                            icon={'solar:test-tube-minimalistic-bold-duotone'}
                        />
                    </div>
                    <div className="mt-6 flex-grow text-center sm:mt-0 sm:text-left">
                        <h2 className="title-font mb-2 text-lg font-medium text-white">
                            Build & Test
                        </h2>
                        <p className="text-base leading-relaxed">
                            Get work done quicker by building out entire projects or isolating code
                            to test features and animations.Want to have grater availability ?
                            Upgrade your plan to Premium account for largest expansion.
                        </p>
                    </div>
                </div>
                <div className="mx-auto mb-10 flex flex-col items-center border-b border-gray-800 pb-10 sm:flex-row lg:w-3/5">
                    <div className="mt-6 flex-grow text-center sm:mt-0 sm:text-left">
                        <h2 className="title-font mb-2 text-lg font-medium text-white">
                            Learn & Discover
                        </h2>
                        <p className="text-base leading-relaxed">
                            Want to upgrade your skills and get noticed? Participating in CodeLabs
                            Challenges is a great way to try something new. We frequently feature
                            these Lab on our homepage and across social media!.
                        </p>
                    </div>
                    <div className="order-first inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-green-400 sm:order-none sm:ml-10 sm:h-32 sm:w-32">
                        <IconRenderer
                            className="h-10 w-10 sm:h-16 sm:w-16"
                            icon={'simple-icons:openstreetmap'}
                        />
                    </div>
                </div>
                <div className="mx-auto flex flex-col items-center sm:flex-row lg:w-3/5">
                    <div className="inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-green-400 sm:mr-10 sm:h-32 sm:w-32">
                        <IconRenderer
                            className="h-10 w-10 sm:h-16 sm:w-16"
                            icon={'carbon:ibm-watsonx-code-assistant-for-z-refactor'}
                        />
                    </div>
                    <div className="mt-6 flex-grow text-center sm:mt-0 sm:text-left">
                        <h2 className="title-font mb-2 text-lg font-medium text-white">
                            Share Your Work
                        </h2>
                        <p className="text-base leading-relaxed">
                            Become a part of active front-end community by sharing work. Presenting
                            at a conference? Show your code directly in the browser with
                            Presentation Mode..
                        </p>
                    </div>
                </div>
                <Link
                    href={'/register'}
                    className=" btn btn-primary mx-auto mt-8 flex max-w-fit  rounded-xl border-0 bg-primary px-8 py-2 text-lg focus:outline-none"
                >
                    Try Now
                </Link>
            </div>
        </section>
    );
};

export default Services;
