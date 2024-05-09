import Input from '@/app/components/globals/form/input';
import BlogCard from './components/blog-card';
import HeaderImage from './components/header-image';

const blogs = [
    {
        id: 1,
        title: 'Dive into the World of React JS: Building Dynamic User Interfaces',
        createdAt: '2024/4/12',
        description: ''
    }
];

export default function LabsPage() {
    return (
        <div className="flex flex-col gap-12 p-8">
            {intoduction()}
            {Header()}
            {Blogs()}
        </div>
    );
}

const Blogs = () => {
    return (
        <div className="flex flex-wrap gap-8 max-xl:justify-center">
            {blogs.map((blog, index) => (
                <span key={index}>
                    <BlogCard blog={blog} />
                </span>
            ))}
        </div>
    );
};
const intoduction = () => {
    return (
        <div className="grid gap-1 px-8 lg:h-48 lg:grid-cols-2 xl:grid-cols-3">
            <p className="col-span-1 self-center text-center text-3xl font-bold xl:col-span-2">
                All you wanted to know about working with designer and creating delightful product
                experiences
            </p>
            <span className="min-h-24 w-full max-lg:hidden">
                <HeaderImage />
            </span>
        </div>
    );
};

const Header = () => {
    return (
        <div className="flex flex-col gap-4  sm:flex-row">
            <h1 className="text-3xl font-bold text-white">Blogs</h1>
            <div className="divider divider-horizontal h-12 max-sm:hidden"></div>
            <span className="mt-2 min-w-72">
                <Input
                    id="search"
                    type="text"
                    placeholder="Search for Blogs ..."
                    icon="circum:search"
                    defaultValue={''}
                />
            </span>
        </div>
    );
};
