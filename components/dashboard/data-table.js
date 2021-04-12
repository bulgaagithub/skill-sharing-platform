import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { useSession } from "next-auth/client";
import Button from "react-bootstrap/Button";

export default function DataTable({ data, type, handleReview }) {
  moment.locale("mn");
  const [session, loading] = useSession();
  return (
    <div>
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Гарчиг</th>
            <th>Төлөв</th>
            <th>Огноо</th>
            <th>Нийтлэгдсэн</th>
            { session.user?.is_admin && <th>Actions</th> }
          </tr>
        </thead>
        <tbody>
          {data?.map((article, i) => (
            <tr key={article._id}>
              <td>{i + 1}</td>
              <td>{article.title}</td>
              <td>{article.status}</td>
              <td>{moment(article.createdAt).format("YYYY-MM-DD")}</td>
              <td>{moment(article.createdAt).format("YYYY-MM-DD")}</td>
              { session.user?.is_admin && <td><Button variant="primary" onClick={()=> handleReview(article)}>Review</Button></td> }
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
