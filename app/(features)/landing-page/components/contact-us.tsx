const Contact = () => {
    return <div>
        <section className=" body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Contact Us</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Have questions or need help? Reach out to us! .</p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label className="leading-7 text-sm ">Name</label>
                                <input type="text" id="name" name="name" className="w-full bg-base-300 bg-opacity-40 rounded border border-gray-700 focus:border-green-500  focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label className="leading-7 text-sm ">Email</label>
                                <input type="email" id="email" name="email" className="w-full bg-base-300 bg-opacity-40 rounded border border-gray-700 focus:border-green-500  focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label className="leading-7 text-sm ">Message</label>
                                <textarea id="message" name="message" className="w-full bg-base-300 bg-opacity-40 rounded border border-gray-700 focus:border-green-500  focus:ring-2 focus:ring-green-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button className="btn flex mx-auto btn-primary border-0 py-2 px-8 rounded-xl text-lg">FeedBack</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default Contact;