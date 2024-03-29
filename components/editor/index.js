import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSession } from "next-auth/client";
import { useGlobal } from "hooks/use-global";
import { useFormik } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Button,
  Select,
  Box,
} from "@chakra-ui/react";
import {
  createUpdate,
  approveArticle,
} from "components/dashboard/actions/requests";
import { DeleteDialog } from "components/alert-dialog";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import validate from "./validate";

export default function MyEditor({ type, categories, data }) {
  const [session] = useSession();
  const [editorValue, setValue] = useState(data ? data.content : null);
  const [isDelete, setDelete] = useState(false);
  const { loading, setLoading } = useGlobal();
  const editorRef = useRef();
  const router = useRouter();

  const { addToast } = useToasts();

  const formik = useFormik({
    initialValues: {
      title: data ? data.title : "",
      summary: data ? data.summary : "",
      category: data ? data.category._id : categories ? [0]._id : "",
      status: data ? data.status : "pending",
    },
    validate,
    onSubmit: async (values) => {
      // await handleSubmit(values, editorValue);
      await createUpdate(
        values,
        editorValue,
        session,
        isDelete ? "delete" : type,
        setLoading,
        addToast,
        data,
        router
      );
    },
  });

  const handleEditorChange = (e) => {
    setValue(e.target.getContent());
  };

  const handleDelete = () => {
    setDelete(true);
    formik.handleSubmit();
  };

  return loading ? (
    <div>loading...</div>
  ) : (
    // <Form onSubmit={(e) => handleSubmit(e, editorValue)}>
    <>
      {session?.user?.is_admin && type === "review" && (
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
          onClick={async () =>
            await approveArticle(session, setLoading, addToast, data, router)
          }
        >
          <Button colorScheme="green">Нийтлэх</Button>
        </Box>
      )}
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="title">Гарчиг</FormLabel>
          <Input
            type="text"
            placeholder="Enter title"
            name="title"
            id="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {formik.errors.title ? (
            <Text
              fontSize="md"
              bgGradient="linear(to-l, #7928CA,#FF0000)"
              bgClip="text"
            >
              {formik.errors.title}
            </Text>
          ) : null}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="title">Хураангуй</FormLabel>
          <Textarea
            name="summary"
            id="summary"
            maxLength={250}
            placeholder="Enter summary"
            onChange={formik.handleChange}
            value={formik.values.summary}
            size="sm"
          />
          {formik.errors.summary ? (
            <Text
              fontSize="md"
              bgGradient="linear(to-l, #7928CA,#FF0000)"
              bgClip="text"
            >
              {formik.errors.summary}
            </Text>
          ) : null}
        </FormControl>

        <Editor
          ref={editorRef}
          initialValue={data?.content}
          apiKey={process.env.NEXT_PUBLIC_TINY_API}
          init={{
            height: 500,
            menubar: "",
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount codesample image imagetools",
            ],
            image_list: [
              { title: "My image 1", value: "https://www.example.com/my1.gif" },
              {
                title: "My image 2",
                value: "http://www.moxiecode.com/my2.gif",
              },
            ],
            toolbar:
              "undo redo | formatselect | bold italic | \
         alignleft aligncenter alignright | \
         bullist numlist outdent indent image codesample | help",
          }}
          onChange={handleEditorChange}
        />
        <FormControl>
          <FormLabel htmlFor="cover_image">Нүүр зураг</FormLabel>
          <Input
            id="exampleFormControlFile1"
            label="Нүүр зураг"
            type="file"
            name="cover_image"
          />
        </FormControl>

        {categories && (
          <FormControl>
            <FormLabel htmlFor="title">Ангилал</FormLabel>
            <Select
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              isRequired
            >
              {categories.map((e, i) => (
                <option key={e.id} value={e._id}>
                  {e.name}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        {/* { session?.user?.is_admin && (
        <FormControl>
          <FormLabel htmlFor="title">Төлөв</FormLabel>
          <Select
            id="status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approve</option>
          </Select>
        </FormControl>
      )} */}
        <Button
          isLoading={loading}
          loadingText="Submitting"
          type="submit"
          className="mt-2"
          colorScheme="blue"
          variant="solid"
        >
          Хадгалах
        </Button>
        {type === "review" && <DeleteDialog onYes={handleDelete} />}
        {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      </form>
    </>
  );
}
