import React, { useState } from "react";
import { Pagination } from 'react-bootstrap';

const Page = ({ pageData, setPage, pageIndex }) => {

    let items = [];
    for (let number = 0; number < pageData.pageCount; number++) {
        items.push(
            <Pagination.Item key={number} active={pageIndex === number} onClick={() => {
                setPage(number);
            }}>
            {number+1}
            </Pagination.Item>
        );
    }
    return <Pagination>
        { items }
    </Pagination>
}

export default Page;