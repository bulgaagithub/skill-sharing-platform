import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

import { signIn, signOut, useSession } from "next-auth/client";
import { useTheme } from "hooks/use-theme";
import useSWR from "swr";
import moment from "moment";

const PAGE_LIMIT = 5;
export default function Articles({ articles }) {
  moment.locale("mn");
  const { theme, toggleTheme } = useTheme();
  const [session, loading] = useSession();
  const [pageIndex, setPageIndex] = useState(1);

  const fetcher = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };

  const { data, isValidating } = useSWR(
    `http://localhost:9000/api/v1/articles/user/?page=${pageIndex}&limit=${PAGE_LIMIT}`,
    fetcher
  );

  let pages = [];
  let active = 1;

  if (data && data.data?.length !== 0) {
    for (let i = 1; i <= data.pagination.pageCount; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === active}
          onClick={() => setPageIndex(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  }

  return isValidating ? (
    <div>Loading</div>
  ) : !data.data?.length === 0 ? (
    <div>No data</div>
  ) : (
    <>
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Гарчиг</th>
            <th>Төлөв</th>
            <th>Огноо</th>
            <th>Нийтлэгдсэн</th>
          </tr>
        </thead>
        <tbody>
          {data.articles.map((article, i) => (
            <tr key={article._id}>
              <td>{i + 1}</td>
              <td>{article.title}</td>
              <td>{article.status}</td>
              <td>{moment(article.createdAt).format("YYYY-MM-DD")}</td>
              <td>{moment(article.createdAt).format("YYYY-MM-DD")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data && (
        <div className="pagination2">
          <Pagination>{pages}</Pagination>
        </div>
      )}
      <style jsx>{`
        .pagination2 {
          text-align: center;
          display: flex !important;
          flex-direction: row;
          justify-content: flex-end;
          width: 100%;
        }
      `}</style>
    </>
  );
}
