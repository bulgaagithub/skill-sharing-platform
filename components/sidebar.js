import React from "react";
import { ListGroup } from "react-bootstrap";
import { useTheme } from "hooks/use-theme";
import { signOut } from "next-auth/client";

export default function SideBar({ active, activeChange }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <ListGroup>
        <ListGroup.Item
          active={active === 'articles' ? true : false}
          onClick={() => activeChange('articles')}
        >
          Нийтлэлүүд
        </ListGroup.Item>
        <ListGroup.Item
          active={active === 'add' ? true : false} 
          onClick={() => activeChange('add')}
        >
          Нийтлэл нэмэх
        </ListGroup.Item>
        <ListGroup.Item
        >
          Цалин
        </ListGroup.Item>
        <ListGroup.Item
          onClick={() => signOut()}
        >
          Гарах
        </ListGroup.Item>
      </ListGroup>
      <style jsx>{`
        .active {
            background-color: #33b5e5 !important;
        }
      `}</style>
    </div>
  );
}
