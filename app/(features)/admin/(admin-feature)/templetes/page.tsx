'use client';
import { planType } from '@/app/@types/plan';
import { TempletsTableType } from '@/app/@types/templetes';
import { ManageState } from '@/app/components/page-state/state_manager';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import TempletesViewHeader from './components/headea';
import AddTempelet from './components/modal/add_templete_modal';
import DeleteTempletesModal from './components/modal/delete-templete-modal';
import TempletessTable from './components/templetes-table';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { getAllTemplate } from '@/app/api/(modules)/admin/template/services/action';
const Templetes = () => {
    const pageSize = 10;
    const params = useSearchParams();
    const [templetes, setTempletes] = useState<Array<TempletsTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');
    const [modalTempletesId, setModalTempletesId] = useState('');
    useEffect(() => {
        var pageNumber = Number(params.get('id') ?? '1');
        updateCurrentPage(pageNumber);
        getTempletes({ newSearchWord: searchWord, page: pageNumber });
    }, []);

    const getTempletes = async ({
        newSearchWord,
        page
    }: {
        newSearchWord: string;
        page: number;
    }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await getAllTemplate({
                page: page,
                pageSize: pageSize,
                searchWord: newSearchWord
            });
            setTotalPageCount(res.templateCount);
            setTempletes(
                res.templates.map(e => {
                    return {
                       createdAt:e.createdAt,
                       id:e.id,
                       image:e.imageTemplate,
                       name:e.nameTemplate,
                    } as TempletsTableType;
                })
            );
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        getTempletes({ newSearchWord: searchWord, page: index });
    };

    return (
        <div className="flex flex-col gap-2 p-6">
            <div className="flex flex-col">
                <TempletesViewHeader
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
                        getTempletes({ newSearchWord: e, page: 1 });
                    }}
                />
                <ManageState
                    empty={templetes.length == 0}
                    error={error}
                    errorAndEmptyCallback={() => {
                        getTempletes({
                            newSearchWord: searchWord,
                            page: currentPage
                        });
                    }}
                    loading={loading}
                    loadedState={
                        <TempletessTable
                            templetes={templetes}
                            pageCount={totalPageCount / pageSize}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                            deleteTempletesButtonClicked={user => {
                                setModalTempletesId(user.id);
                                if (document) {
                                    (
                                        document.getElementById(
                                            'delete-templetes-modal'
                                        ) as HTMLFormElement
                                    )?.showModal();
                                }
                            }}
                        />
                    }
                />
            </div>
            <DeleteTempletesModal templetesId="" callback={() => {}} />
            <AddTempelet callback={()=>{
                toast.success('template created successfully');
            }}/>
            <CustomToaster/>
        </div>
    );
};

export default Templetes;
