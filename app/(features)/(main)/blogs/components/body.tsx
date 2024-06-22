"use client"
import Input from "@/app/components/globals/form/input";
import { useEffect, useState } from "react";
import Content from "./content";
import { useDebounce } from "use-debounce";
import { getBlogs } from "../services/services";
import { blogType } from "@/app/@types/blog";
import { ManageState } from '@/app/components/page-state/state_manager';
import toast from "react-hot-toast";
import Image from "next/image";
import Favorite from "./favorite";
import IconRenderer from "@/app/components/globals/icon";
import Link from "next/link";

const tabs = ['Blogs', 'Trending Blogs', 'Latest Blogs']

const Body = () => {
    const [blogs, setBlogs] = useState<Array<blogType>>([]);
    const [trending, setTrending] = useState<Array<blogType>>([]);
    const [latest, setLatest] = useState<Array<blogType>>([]);
    const [trend, setTrend] = useState<blogType>();
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
            if (debouncedSearch) getBlog()
        };
        const getTrendBlog = async () => {
            await getBlogs('Trending Blogs', 1, 1,).then((res) => {
                if (Array.isArray(res) && res.every((item) => typeof item === 'object' && 'id' in item)) {
                    const data = res as blogType[]
                    setTrend(data[0])
                }
            }).catch((e) => {
                setError(e.message);
                toast.error(e.message);
            })
        };
        getTrendBlog()
        searchFn().then(() => setLoading(false))
    }, debouncedSearch)

    useEffect(() => {
        if (currentTab == 'Blogs') {
            getBlog()
            setCurrentData(blogs)
        }
        else if (currentTab == 'Trending Blogs') {
            getBlog()
            setCurrentData(trending)
        }
        else {
            getBlog()
            setCurrentData(latest)
        }
    }, [currentTab])

    async function getBlog() {
        await getBlogs(
            currentTab, 1, 100, debouncedSearch[0]
        ).then((res) => {
            if (Array.isArray(res) && res.every((item) => typeof item === 'object' && 'id' in item)) {
                if (currentTab == 'Blogs') {
                    console.log('Blogs')
                    setBlogs(res as blogType[]);
                    setCurrentData(res as blogType[])
                }
                else if (currentTab == 'Trending Blogs') {
                    console.log('trend')
                    setTrending(res as blogType[]);
                    setCurrentData(res as blogType[])
                }
                else {
                    console.log('latest')
                    setLatest(res as blogType[]);
                    setCurrentData(res as blogType[])
                }
            }
        }).catch((e) => {
            setError(e.message);
            toast.error(e.message);
        })
    }

    return <div className="flex flex-col gap-4">
        <TrendCard trend={trend} />
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

    return <div className="flex flex-col gap-4 mt-8 sm:flex-row">
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
const TrendCard = ({ trend }: { trend?: blogType }) => {
    if (trend)
        return <Link href={`/blogs/${trend.id}`} className="flex w-fit max-md:w-80 xl:w-3/4 2xl:w-fit max-md:flex-col md:flex-row bg-base-100 rounded-3xl max-md:self-start self-center">
            <Image
                src={trend.photo}
                alt="" width={320} height={208}
                className={" max-h-52 min-h-64 w-80 md:min-w-[350px] rounded-3xl"} />
            <div className="flex flex-col p-4 gap-2">
                <span className="text-3xl font-bold line-clamp-2 text-white">{trend.title}</span>
                <span className="flex gap-4 text-white">
                    <IconRenderer icon='solar:calendar-date-broken' width={24} height={24} />
                    <p>{trend.createdAt?.toLocaleDateString()}</p>
                    <Favorite count={trend.starCount} />
                </span>
                <span
                    className="text-gray-500 line-clamp-5 md:line-clamp-4"
                    dangerouslySetInnerHTML={{ __html: trend.contant }}
                ></span>
            </div>
        </Link>
}