import React from "react";
import { ListGroup } from "react-bootstrap";
import { useTheme } from "hooks/use-theme";
import { signOut, useSession } from "next-auth/client";

export default function SideBar({ active, activeChange }) {
  const { theme, toggleTheme } = useTheme();
  const [auth] = useSession();

  return (
    <div>
      <ListGroup>
        <ListGroup.Item
          active={active === "articles" ? true : false}
          onClick={() => activeChange("articles")}
        >
          Нийтлэл
        </ListGroup.Item>
        <ListGroup.Item
          active={active === "add" ? true : false}
          onClick={() => activeChange("add")}
        >
          Нийтлэл нэмэх
        </ListGroup.Item>
        {auth.user?.is_admin && <ListGroup.Item>Нийтлэгчид</ListGroup.Item>}
        <ListGroup.Item>Цалин</ListGroup.Item>
        <ListGroup.Item onClick={() => signOut()}>Гарах</ListGroup.Item>
      </ListGroup>
      <style jsx>{`
        .active {
          background-color: #33b5e5 !important;
        }
      `}</style>
    </div>
  );
}
