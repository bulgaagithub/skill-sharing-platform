import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { useToasts } from "react-toast-notifications";
import useSWR from "swr";
import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";

import { useGlobal } from "hooks/use-global";
import { blockUser } from "components/dashboard/actions/requests";

const PAGE_LIMIT = 10;
export default function index() {
  const [pageIndex, setPageIndex] = useState(1);
  const [session] = useSession();
  const { addToast } = useToasts();

  const { loading, setLoading } = useGlobal();
  const router = useRouter();

  const fetcher = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    if (!res.ok) {
      const result = await res.json();
      if (result.error.name === "TokenExpiredError") {
        addToast("Нэвтрэх эрх дууссан байна.", { appearance: "error" });
        setTimeout(() => {
          signOut();
        }, 1000);
      } else {
        addToast(result.error.message + result.error.statusCode, {
          appearance: "error",
          autoDismiss: 6000,
        });
      }
      return false;
    }
    return res.json();
  };

  const { data, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?page=${pageIndex}&limit=${PAGE_LIMIT}`,
    fetcher, {
        refreshInterval: 1000
    }
  );

  return !data?.data?.length === 0 ? (
    <div>Одоогоор нийтлэл ороогүй байна.</div>
  ) : loading ? (
    <div>loading...</div>
  ) : (
    <Table>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Нэр</Th>
          <Th>И-мэйл</Th>
          <Th>Төлөв</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.data.map((user, i) => (
          <Tr>
            <Td>{i + 1}</Td>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.active === "active" ? "Active" : "InActive"}</Td>
            <Td>
              {user.active === "active" ? (
                <Button
                  colorScheme="red"
                  onClick={() =>
                    blockUser("Block", session, setLoading, addToast, user, router)
                  }
                >
                  Block
                </Button>
              ) : (
                <Button
                  colorScheme="green"
                  onClick={() =>
                    blockUser("Active", session, setLoading, addToast, user, router)
                  }
                >
                  Active
                </Button>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
