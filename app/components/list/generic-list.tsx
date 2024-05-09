'use client';

import PagginationComponentForList from '@/app/components/list/paggination-component-for-list';

export default class CodeLabList<T> {
    builder: ({ item, index }: { item: T; index: number }) => JSX.Element;
    onChangePage: ({ page }: { page: number }) => void;
    items: Array<T>;
    pageCount: number;
    currentPage: number;
    wrap: boolean;

    constructor({
        itemBuilder,
        onChangePage,
        pageCount,
        currentPage,
        items,
        wrap
    }: {
        onChangePage: ({ page }: { page: number }) => void;
        itemBuilder: ({ item, index }: { item: T; index: number }) => JSX.Element;
        pageCount: number;
        currentPage: number;
        wrap?: boolean;
        items: Array<T>;
    }) {
        this.builder = itemBuilder;
        this.onChangePage = onChangePage;
        this.pageCount = pageCount;
        this.currentPage = currentPage;
        this.items = items;
        this.wrap = wrap ?? false;
        this.pageCount = Math.ceil(pageCount);
    }

    build() {
        return (
            <div className="flex flex-col items-end gap-4">
                <div
                    className={
                        this.wrap
                            ? 'flex w-full flex-wrap justify-center gap-1 overflow-x-auto'
                            : 'w-full flex-wrap overflow-x-auto'
                    }
                >
                    {this.items.map((item, index) => {
                        return this.builder({ item, index });
                    })}
                </div>

                {this.pageCount > 1 ? (
                    <div className="mr-3">
                        <PagginationComponentForList
                            currentPage={this.currentPage}
                            onPageChange={this.onChangePage}
                            pageCount={this.pageCount}
                        />
                    </div>
                ) : undefined}
            </div>
        );
    }
}
