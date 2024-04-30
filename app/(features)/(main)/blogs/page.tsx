import Input from "@/app/components/globals/form/input";
import IconRenderer from "@/app/components/globals/icon";
import Link from "next/link";
import HeaderImage from "./components/header-image";
import BlogCard from "./components/blog-card";

const blogs = [{
    id: 1,
    title: 'Dive into the World of React JS: Building Dynamic User Interfaces',
    createdAt: '2024/4/12',
    description: ''
}]

export default function LabsPage() {
    return <div className="flex flex-col p-8 gap-12">
        {intoduction()}
        {Header()}
        {Blogs()}
    </div>;
}

const Blogs = () => {
    return <div className="flex flex-wrap max-xl:justify-center gap-8">
        {blogs.map((blog, index) => (
            <span key={index}>
                <BlogCard blog={blog} />
            </span>
        ))}
    </div>
}
const intoduction = () => {
    return <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-1 px-8 lg:h-48">
        <p className="col-span-1 xl:col-span-2 font-bold text-3xl self-center text-center">All you wanted to know about working with designer and creating delightful product experiences</p>
        <span className="w-full min-h-24 max-lg:hidden"><HeaderImage /></span>
    </div>
}

const Header = () => {
    return <div className="flex flex-col sm:flex-row  gap-4">
        <h1 className="text-3xl font-bold text-white">Blogs</h1>
        <div className="divider divider-horizontal max-sm:hidden h-12"></div>
        <span className='min-w-72 mt-2'>
            <Input
                id="search"
                type="text"
                placeholder="Search for Blogs ..."
                icon="circum:search"
                defaultValue={""}
            />
        </span>
    </div>
}
