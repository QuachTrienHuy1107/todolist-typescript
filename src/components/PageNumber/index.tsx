import { Pagination } from 'react-bootstrap';

import style from './style.module.scss';

export interface Props {
    totalItem: number;
    page: number;
    handlePaginate: (page: number) => void;
}

const PageNumber: React.FC<Props> = ({ totalItem, page, handlePaginate }) => (
        <Pagination className={style.page}>
            <Pagination.First disabled={page === 1} onClick={() => handlePaginate(-1)} />
            <span className={style.pageNumber}>{page}</span>
            <Pagination.Last disabled={totalItem === 0} onClick={() => handlePaginate(1)} />
        </Pagination>
    );

export default PageNumber;
