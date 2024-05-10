import { FC } from 'react';

import { Pagination } from 'antd';

interface CustomPaginationProps {
    total: number;
    onPageChange: (page: number) => void;
    pageSize?: number;
    current: number;
}

export const CustomPagination: FC<CustomPaginationProps> = ({ total, onPageChange, pageSize, current, }) => {

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };


    return (
        <Pagination
            total={total}
            pageSize={Number(pageSize)}
            current={current}
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            onChange={handlePageChange}
        />
    );
};
