'use client';
import { tag } from '@/app/@types/tag';
import { getTag } from '@/app/api/(modules)/admin/service/action';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AddTagModal from '../challenges/components/tags-modal';
import TagViewHeader from '../templetes/components/headea';
import TagsTable, { TagTableType } from './components/tag-table';
const TagView = () => {
    const pageSize = 10;
    const params = useSearchParams();
    const [templetes, setTag] = useState<Array<TagTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');
    const [modalTagId, setModalTagId] = useState('');
    useEffect(() => {
        var pageNumber = Number(params.get('id') ?? '1');
        updateCurrentPage(pageNumber);
        getServerTag({ newSearchWord: searchWord, page: pageNumber });
    }, []);

    const getServerTag = async ({
        newSearchWord,
        page
    }: {
        newSearchWord: string;
        page: number;
    }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await getTag({
                page: page,
                pageSize: pageSize,
                tagName: newSearchWord
            });
            setTotalPageCount(res.tagCount);
            setTag(
                res.tags.map(e => {
                    return {
                        createdAt: e.createdAt,
                        id: e.id,
                        name: e.tagename
                    } as TagTableType;
                })
            );
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    const route = useRouter();
    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        getServerTag({ newSearchWord: searchWord, page: index });
    };

    return (
        <div className="flex flex-col gap-2 p-6">
            <div className="flex flex-col">
                <TagViewHeader
                    onCreateClicked={() => {
                        if (document) {
                            (
                                document.getElementById('add-templete-modal') as HTMLFormElement
                            )?.showModal();
                        }
                    }}
                    searchWord={searchWord}
                    onFieldChanged={e => {
                        setSearchWord(e);
                        updateCurrentPage(1);
                        setTotalPageCount(0);
                        getServerTag({ newSearchWord: e, page: 1 });
                    }}
                />
                <ManageState
                    empty={templetes.length == 0}
                    error={error}
                    errorAndEmptyCallback={() => {
                        getServerTag({
                            newSearchWord: searchWord,
                            page: currentPage
                        });
                    }}
                    loading={loading}
                    loadedState={
                        <TagsTable
                            tag={templetes}
                            pageCount={totalPageCount / pageSize}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                            editTagButtonClicked={tag => {}}
                        />
                    }
                />
            </div>
            <AddTagModal
                newTagCallbackFunction={function (tag: tag): void {
                    updateCurrentPage(1);
                    getServerTag({ newSearchWord: searchWord, page: 1 });
                }}
            />
            <CustomToaster />
        </div>
    );
};

export default TagView;
