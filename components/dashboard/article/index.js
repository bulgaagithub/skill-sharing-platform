import { useState } from "react";
import { useSession } from "next-auth/client";
import moment from "moment";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Current from "components/dashboard/article/user-article";
import All from "components/dashboard/article/all-article";

export default function Article({ categories }) {
  moment.locale("mn");
  const [key, setKey] = useState("current");
  const [session] = useSession();
  const [reviewArticle, setReview] = useState(null);

  const handleReview = (article) => {
    setReview(article);
  };

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="current" title="Миний нийтлэл">
          <Current handleReview={handleReview} categories = { categories } reviewArticle={reviewArticle} />
      </Tab>
      {session.user?.is_admin && (
        <Tab eventKey="all" title="Бүх нийтлэл">
          <All categories = { categories } reviewArticle={reviewArticle} handleReview={handleReview}/>
        </Tab>
      )}
    </Tabs>
  );
}
