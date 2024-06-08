'use client';
import Input from '@/app/components/globals/form/input';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BlogTable, { blogTableType } from './components/table/blog-table'
import { useDebounce } from 'use-debounce';
import IconRenderer from '@/app/components/globals/icon';
import { GetBlogs } from './services';

const Blogs = () => {

    const [searchValue, setSearchValue] = useState<string>('');
    const [filter, setFilter] = useState<string>('All Blogs');
    const [currentPage, updateCurrentPage] = useState(0);
    const currentParams = useSearchParams();
    const [selectedBlogs, setSelectedBlogs] = useState<Array<blogTableType>>([]);
    const [blogs, setBlogs] = useState<Array<blogTableType>>([]);
    const pageSize = 4;
    const debouncedSearch = useDebounce(searchValue, 1000)
    const [isDelete, setIsDelete] = useState(false);


    useEffect(() => {
        GetBlogs('All Blogs').then((res) => {
            if (res) {
                setBlogs(res);
                setSelectedBlogs(res)
            }
        })
        const id = Number(currentParams.get('id') ?? '1');
        onPageChange({ index: id });
        setIsDelete(false);
    }, [isDelete]);

    useEffect(() => {
        if (debouncedSearch) {
            GetBlogs(filter, debouncedSearch[0]).then((res) => {
                if (res) {
                    setBlogs(res);
                    setSelectedBlogs(res)
                }
            })
        }
    }, debouncedSearch)

    useEffect(() => {
        GetBlogs(filter, debouncedSearch[0]).then((res) => {
            if (res) {
                setBlogs(res);
                setSelectedBlogs(res)
            }
        })
    }, [filter])



    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        setSelectedBlogs([
            ...chunkArray({
                startingIndex: (index - 1) * pageSize,
                lastIndex: index * pageSize,
                array: blogs
            })
        ]);
    };
    function chunkArray({
        array,
        lastIndex,
        startingIndex
    }: {
        startingIndex: number;
        array: Array<blogTableType>;
        lastIndex: number;
    }): Array<blogTableType> {
        const chunks: Array<blogTableType> = [];
        for (let i = startingIndex; i < lastIndex && i < array.length; i++) {
            chunks.push(array[i]);
        }
        return chunks;
    }

    return <div className="flex flex-col gap-2 px-6">
        <Header
            searchValue={searchValue}
            onChange={(val: string) => setSearchValue(val)}
            filter={filter}
            onFilterChange={(val: string) => setFilter(val)}
        />
        {blogs.length > 0 ?
            <BlogTable
                blogs={selectedBlogs}
                pageCount={Math.ceil(blogs.length / pageSize)}
                currentPage={currentPage}
                onPageChange={onPageChange}
                isDelete={(value) => setIsDelete(value)}
            /> :
            <span className='font-bold text-center'>There is no challenge to display</span>
        }
    </div>
};

export default Blogs;

const Header = ({ searchValue, onChange, filter, onFilterChange }:
    {
        searchValue: string, onChange: (val: string) => void,
        filter: string, onFilterChange: (val: string) => void
    }) => {

    return <div className="flex flex-col gap-8 ">
        <h1 className="text-4xl font-bold text-white">Blogs</h1>
        <div className="flex gap-8">
            <span className='min-w-72'>
                <Input
                    id="search"
                    type="text"
                    placeholder="Search for Blogs ..."
                    icon="circum:search"
                    value={searchValue}
                    onChange={(e) => onChange(e.target.value)}
                />
            </span>
            <div className="dropdown mr-auto">
                <summary tabIndex={0} className=" flex min-h-[35px] h-[35px] btn">{filter ? filter : 'All Blogs'}
                    <IconRenderer width={24} height={24} icon={'solar:alt-arrow-down-linear'} />
                </summary>
                <ul tabIndex={0} className="mt-2 ml-4 p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li onClick={() => { onFilterChange('All Blogs') }}>
                        <a>All Blogs</a>
                    </li>
                    <li onClick={() => { onFilterChange('Trending Blogs') }}>
                        <a>Trending Blogs</a>
                    </li>
                    <li onClick={() => { onFilterChange('Latest Blogs') }}>
                        <a>Latest Blogs</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

