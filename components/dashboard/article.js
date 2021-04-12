import { useState } from "react";
import { useSession } from "next-auth/client";
import moment from "moment";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Current from "components/dashboard/user-article";
import All from "components/dashboard//all-article";

export default function Article({ categories }) {
  moment.locale("mn");
  const [key, setKey] = useState("current");
  const [session] = useSession();

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="current" title="Миний нийтлэл">
          <Current />
      </Tab>
      {session.user?.is_admin && (
        <Tab eventKey="all" title="Бүх нийтлэл">
          <All categories = { categories }/>
        </Tab>
      )}
    </Tabs>
  );
}
