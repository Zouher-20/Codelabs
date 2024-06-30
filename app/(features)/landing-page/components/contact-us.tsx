'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [des, setdes] = useState('');

    const ClickHandler = () => {
        if (name == '' || email == '' || des == '')
            toast.error('Please complete your contact information');
        else {
            setname('');
            setemail('');
            setdes('');
            toast.success('Submitted successfully');
        }
    };
    return (
        <div>
            <section id="Contact us" className="body-font relative">
                <div className="container mx-auto px-5 py-24">
                    <div className="mb-12 flex w-full flex-col text-center">
                        <h1 className="title-font mb-4 text-2xl font-medium text-white sm:text-3xl">
                            Contact Us
                        </h1>
                        <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                            Have questions or need help? Reach out to us! .
                        </p>
                    </div>
                    <div className="mx-auto md:w-2/3 lg:w-1/2">
                        <div className="-m-2 flex flex-wrap">
                            <div className="w-1/2 p-2">
                                <div className="relative">
                                    <label className="text-sm leading-7 ">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full rounded border border-gray-700 bg-base-300 bg-opacity-40 px-3  py-1 text-base leading-8 text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-green-500 focus:ring-2 focus:ring-green-900"
                                        onChange={e => {
                                            setname(e.target.value);
                                        }}
                                        value={name}
                                    />
                                </div>
                            </div>
                            <div className="w-1/2 p-2">
                                <div className="relative">
                                    <label className="text-sm leading-7 ">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full rounded border border-gray-700 bg-base-300 bg-opacity-40 px-3  py-1 text-base leading-8 text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-green-500 focus:ring-2 focus:ring-green-900"
                                        onChange={e => {
                                            setemail(e.target.value);
                                        }}
                                        value={email}
                                    />
                                </div>
                            </div>
                            <div className="w-full p-2">
                                <div className="relative">
                                    <label className="text-sm leading-7 ">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        onChange={e => {
                                            setdes(e.target.value);
                                        }}
                                        value={des}
                                        className="h-32 w-full resize-none rounded border border-gray-700 bg-base-300  bg-opacity-40 px-3 py-1 text-base leading-6 text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-green-500 focus:ring-2 focus:ring-green-900"
                                    />
                                </div>
                            </div>
                            <div className="w-full p-2">
                                <button
                                    onClick={ClickHandler}
                                    className="btn btn-primary mx-auto flex rounded-xl border-0 px-8 py-2 text-lg"
                                >
                                    FeedBack
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
