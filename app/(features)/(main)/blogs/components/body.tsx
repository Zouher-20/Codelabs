"use client"
import Input from "@/app/components/globals/form/input";
import { useEffect, useState } from "react";
import Content from "./content";
import { useDebounce } from "use-debounce";
import { getBlogs, getLatest, getTrending } from "../services/services";
import { blogType } from "@/app/@types/blog";
import { ManageState } from '@/app/components/page-state/state_manager';
import toast from "react-hot-toast";

const tabs = ['Blogs', 'Trending Blogs', 'Latest Blogs']

const Body = () => {
    const [blogs, setBlogs] = useState<Array<blogType>>([]);
    const [trending, setTrending] = useState<Array<blogType>>([]);
    const [latest, setLatest] = useState<Array<blogType>>([]);
    const [currentData, setCurrentData] = useState<Array<blogType>>([]);
    const [currentTab, setCurrentTab] = useState('Blogs');
    const [searchValue, setSearchValue] = useState<string>('');
    const debouncedSearch = useDebounce(searchValue, 1000)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setCurrentData([]);
        const searchFn = async () => {
            if (debouncedSearch) {
                getBlogs({
                    blogTitle: debouncedSearch[0],
                    blogContent: debouncedSearch[0],
                    page: 1, pageSize: 100
                }).then((res) => {
                    if (Array.isArray(res) && res.every((item) => typeof item === 'object' && 'id' in item)) {
                        setBlogs(res as blogType[]);
                        if (currentTab == 'Blogs')
                            setCurrentData(res as blogType[])
                    }
                }).catch((e) => {
                    setError(e.message);
                    toast.error(e.message);
                })
                getTrending({
                    blogTitle: debouncedSearch[0],
                    blogContent: debouncedSearch[0],
                    page: 1, pageSize: 100
                }).then((res) => {
                    if (Array.isArray(res) && res.every((item) => typeof item === 'object' && 'id' in item)) {
                        setTrending(res as blogType[]);
                        if (currentTab == 'Trending Blogs')
                            setCurrentData(res as blogType[])
                    }
                }).catch((e) => {
                    setError(e.message);
                    toast.error(e.message);
                })
                getLatest({
                    blogTitle: debouncedSearch[0],
                    blogContent: debouncedSearch[0],
                    page: 1, pageSize: 100
                }).then((res) => {
                    if (Array.isArray(res) && res.every((item) => typeof item === 'object' && 'id' in item)) {
                        {
                            setLatest(res as blogType[]);
                            if (currentTab == 'Latest Blogs')
                                setCurrentData(res as blogType[])
                        }
                    }
                }).catch((e) => {
                    setError(e.message);
                    toast.error(e.message);
                })
            }
        };
        setTimeout(() => {
            searchFn().then(() => setLoading(false))
        }, 1000)
    }, debouncedSearch)

    useEffect(() => {
        if (currentTab == 'Blogs') setCurrentData(blogs)
        else if (currentTab == 'Trending Blogs') setCurrentData(trending)
        else setCurrentData(latest)
        console.log(currentData);
    }, [currentTab])


    return <div className="flex flex-col gap-4">
        <Header
            HandleTab={(tab) => setCurrentTab(tab)}
            searchValue={searchValue}
            onChange={(val: string) => setSearchValue(val)} />
        {
            <ManageState
                loading={loading}
                error={error}
                errorAndEmptyCallback={() => { }}
                empty={currentData.length == 0}
                loadedState={<Content blogs={currentData} />}
            />
        }
    </div>
};

export default Body;


const Header = ({ HandleTab, onChange, searchValue }: {
    HandleTab: (tab: string) => void,
    onChange: (val: string) => void,
    searchValue: string,
}) => {
    const [currentTab, setCurrentTab] = useState('Blogs');

    return <div className="flex flex-col gap-4  sm:flex-row">
        <h1 className="text-3xl font-bold text-white">{currentTab}</h1>
        <div className="divider divider-horizontal h-12 max-sm:hidden"></div>
        <div role="tablist" className="mt-2 mr-auto">
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    role="tab"
                    className={(currentTab == tab ? 'text-white' : '') + " tab"}
                    onClick={() => { HandleTab(tab), setCurrentTab(tab) }}
                >{tab}
                </div>
            ))}
        </div>
        <span className="mt-2 min-w-72">
            <Input
                id="search"
                type="text"
                placeholder="Search for Blogs ..."
                icon="circum:search"
                value={searchValue}
                onChange={(e) => onChange(e.target.value)}
            />
        </span>
    </div>
}      