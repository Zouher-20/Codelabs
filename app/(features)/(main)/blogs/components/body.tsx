'use client';
import { blogType } from '@/app/@types/blog';
import {
    getAllBlog,
    getBlogByCreatedAt,
    getMyBlog,
    getTrendingBlog
} from '@/app/api/(modules)/blog/services/action';
import noImage from '@/public/images/no-image2.png';

import { userType } from '@/app/@types/user';
import { getMyInfo } from '@/app/api/(modules)/auth/service/actions';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { ManageState } from '@/app/components/page-state/state_manager';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import { getBlogs } from '../services/services';
import BlogSetting from './blog-setting';
import Content from './content';
import Favorite from './favorite';

const tabs = ['Blogs', 'Trending Blogs', 'Latest Blogs', 'My Blogs'];

const Body = () => {
    const [trend, setTrend] = useState<blogType>();
    const [user, setUser] = useState<userType>();
    const [currentData, setCurrentData] = useState<Array<blogType>>([]);
    const [currentTab, setCurrentTab] = useState('Blogs');
    const [searchValue, setSearchValue] = useState<string>('');
    const debouncedSearch = useDebounce(searchValue, 1000);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setCurrentData([]);
        const searchFn = async () => {
            if (debouncedSearch) getBlog();
        };
        searchFn().then(() => setLoading(false));
    }, debouncedSearch);

    useEffect(() => {
        getBlog();
    }, [currentTab]);

    useEffect(() => {
        getUser();
        getTrendBlog();
    }, []);

    async function getBlog() {
        if (currentTab == 'Blogs') {
            await getAllBlog({ page: 1, pageSize: 100, blogTitle: debouncedSearch[0] })
                .then(res => {
                    setCurrentData(res.projects as blogType[]);
                })
                .catch(e => {
                    setError(e.message);
                    toast.error(e.message);
                });
        } else if (currentTab == 'Trending Blogs') {
            await await getTrendingBlog({ page: 1, pageSize: 100, blogTitle: debouncedSearch[0] })
                .then(res => {
                    setCurrentData(res.projects as blogType[]);
                })
                .catch(e => {
                    setError(e.message);
                    toast.error(e.message);
                });
        } else if (currentTab == 'My Blogs') {
            await getMyBlog({ page: 1, pageSize: 100, blogTitle: debouncedSearch[0] })
                .then(res => {
                    setCurrentData(res.projects as blogType[]);
                })
                .catch(e => {
                    setError(e.message);
                    toast.error(e.message);
                });
        } else {
            await getBlogByCreatedAt({ page: 1, pageSize: 100, blogTitle: debouncedSearch[0] })
                .then(res => {
                    setCurrentData(res.projects as blogType[]);
                })
                .catch(e => {
                    setError(e.message);
                    toast.error(e.message);
                });
        }
    }
    async function getTrendBlog() {
        await getBlogs('Trending Blogs', 1, 1)
            .then(res => {
                if (
                    Array.isArray(res) &&
                    res.every(item => typeof item === 'object' && 'id' in item)
                ) {
                    const data = res as blogType[];
                    setTrend(data[0]);
                }
            })
            .catch(e => {
                setError(e.message);
                toast.error(e.message);
            });
    }
    async function getUser() {
        const user = await getMyInfo();
        if (user) setUser(user as unknown as userType);
    }

    const handleDelete = (isDelete: boolean, index: number) => {
        if (isDelete) {
            const arr = [...currentData];
            if (arr[index].id == trend?.id) {
                getTrendBlog();
            }
            arr.splice(index, 1);
            setCurrentData(arr);
        }
    };
    const handleDeleteTrend = (isDelete: boolean, id: string) => {
        if (isDelete) {
            const arr = [...currentData];
            const filterarr = arr.filter(el => {
                return el.id != id;
            });
            setCurrentData(filterarr);
            getTrendBlog();
        }
    };
    return (
        <div className="flex flex-col gap-4">
            <TrendCard
                trend={trend}
                userID={user?.id ?? ''}
                deleteTrend={(val, id) => {
                    handleDeleteTrend(val, id);
                }}
            />
            <Header
                HandleTab={tab => setCurrentTab(tab)}
                searchValue={searchValue}
                onChange={(val: string) => setSearchValue(val)}
            />
            {
                <ManageState
                    loading={loading}
                    error={error}
                    errorAndEmptyCallback={() => {}}
                    empty={currentData.length == 0}
                    loadedState={
                        <Content
                            blogs={currentData}
                            userID={user?.id ?? ''}
                            deleted={(val, index) => {
                                handleDelete(val, index);
                            }}
                        />
                    }
                />
            }
        </div>
    );
};

export default Body;

const Header = ({
    HandleTab,
    onChange,
    searchValue
}: {
    HandleTab: (tab: string) => void;
    onChange: (val: string) => void;
    searchValue: string;
}) => {
    const [currentTab, setCurrentTab] = useState('Blogs');

    return (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row ">
            <h1 className="text-3xl font-bold text-white">{currentTab}</h1>
            <div className="divider divider-horizontal h-12 max-sm:hidden"></div>
            <div role="tablist" className="mr-auto mt-2">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        role="tab"
                        className={(currentTab == tab ? 'text-white' : '') + ' tab'}
                        onClick={() => {
                            HandleTab(tab), setCurrentTab(tab);
                        }}
                    >
                        {tab}
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
                    onChange={e => onChange(e.target.value)}
                />
            </span>
        </div>
    );
};
const TrendCard = ({
    trend,
    userID,
    deleteTrend
}: {
    trend?: blogType;
    userID: string;
    deleteTrend: (val: boolean, id: string) => void;
}) => {
    if (trend) {
        return (
            <div className="flex w-fit self-center rounded-3xl bg-base-100 max-md:w-80 max-md:flex-col max-md:self-start md:flex-row xl:w-3/4 2xl:w-fit">
                <Image
                    src={trend.photo ? trend.photo.replace(/\\/g, '/') : noImage}
                    alt=""
                    width={320}
                    height={208}
                    className={' max-h-52 min-h-64 w-80 rounded-3xl md:min-w-[350px]'}
                />
                <div className="flex flex-col gap-2 p-4">
                    <Link
                        href={`/blogs/${trend.id}`}
                        className="line-clamp-2 text-3xl font-bold text-white"
                    >
                        {trend.title}
                    </Link>
                    <span className="flex gap-4 text-white">
                        <IconRenderer icon="solar:calendar-date-broken" width={24} height={24} />
                        <p>{trend.createdAt?.toLocaleDateString()}</p>
                        {trend && (
                            <Favorite
                                hasStarred={trend.hasStarred}
                                blogId={trend.id}
                                starCount={trend.starCount}
                            />
                        )}
                        <div className="ml-auto flex gap-1">
                            <IconRenderer
                                icon={'fa6-solid:street-view'}
                                width={20}
                                height={24}
                                className={' text-warning'}
                            />
                            {trend.viewCount}
                        </div>
                        {userID == trend.user.id && (
                            <BlogSetting
                                blogID={trend.id}
                                deleted={val => {
                                    deleteTrend(val, trend.id);
                                }}
                            />
                        )}
                    </span>
                    <span
                        className="line-clamp-5 text-gray-500 md:line-clamp-4"
                        dangerouslySetInnerHTML={{ __html: trend.contant }}
                    ></span>
                </div>
            </div>
        );
    }
};
