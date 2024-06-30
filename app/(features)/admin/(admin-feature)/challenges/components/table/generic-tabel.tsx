import PagginationComponent from './paggination';

export interface GenericTableModel {}

export default class CodeLabTable<T extends GenericTableModel> {
    builder: ({ item, index }: { item: T; index: number }) => JSX.Element;
    onChangePage: ({ page }: { page: number }) => void;
    items: Array<T>;
    pageCount: number;
    currentPage: number;
    tableHeader: JSX.Element;
    constructor({
        tabelRowBuilder,
        onChangePage,
        pageCount,
        currentPage,
        tableHeader,
        items
    }: {
        onChangePage: ({ page }: { page: number }) => void;
        tabelRowBuilder: ({ item, index }: { item: T; index: number }) => JSX.Element;
        pageCount: number;
        currentPage: number;
        tableHeader: JSX.Element;
        items: Array<T>;
    }) {
        this.builder = tabelRowBuilder;
        this.onChangePage = onChangePage;
        this.pageCount = pageCount;
        this.currentPage = currentPage;
        this.tableHeader = tableHeader;
        this.items = items;
    }
    build() {
        return (
            <div className="flex flex-col items-end gap-4">
                <div className="w-full overflow-x-auto">
                    <table className="table">
                        {this.tableHeader}
                        <tbody>
                            {this.items.map((item, index) => {
                                return this.builder({ item, index });
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mr-3">
                    <PagginationComponent
                        currentPage={this.currentPage}
                        onPageChange={this.onChangePage}
                        pageCount={this.pageCount}
                    />
                </div>
            </div>
        );
    }
}
