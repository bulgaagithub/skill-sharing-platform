import React from "react";
import { ListGroup } from "react-bootstrap";
import { signOut, useSession } from "next-auth/client";
import { useGlobal } from "hooks/use-global";
import { IconButton } from "@chakra-ui/react";
import { RiLogoutBoxLine } from "@react-icons/all-files/ri/RiLogoutBoxLine";

export default function SideBar() {
  const [auth] = useSession();

  const { activeSide, setActiveSide } = useGlobal();

  return (
    <div>
      <ListGroup>
        <ListGroup.Item
          active={activeSide === "articles" ? true : false}
          onClick={() => setActiveSide("articles")}
        >
          Нийтлэл
        </ListGroup.Item>
        <ListGroup.Item
          active={activeSide === "add" ? true : false}
          onClick={() => setActiveSide("add")}
        >
          Нийтлэл нэмэх
        </ListGroup.Item>
        {auth.user?.is_admin && (
          <ListGroup.Item
            active={activeSide === "users" ? true : false}
            onClick={() => setActiveSide("users")}
          >
            Нийтлэлчид
          </ListGroup.Item>
        )}
        {/* <ListGroup.Item>Цалин</ListGroup.Item> */}
        <ListGroup.Item>
          <IconButton
            colorScheme="red"
            aria-label="Search database"
            icon={<RiLogoutBoxLine />}
            onClick={() => signOut()}
          />
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
