import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import { signIn, signOut, useSession } from "next-auth/client";
import { useGlobal, userGlobal } from "hooks/use-global";
import Router from "next/router";
export default function MyEditor({ categories, data, handleSubmit }) {

  const [session] = useSession();
  const [editorValue, setValue] = useState(data ? data.content : null);
  const { loading } = useGlobal();
  const editorRef = useRef();

  const handleEditorChange = (e) => {
    setValue(e.target.getContent());
  };

  return loading ? (
    <div>loading...</div>
  ) : (
    <Form onSubmit={(e) => handleSubmit(e, editorValue)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Гарчиг</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          defaultValue={data?.title}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Хураангуй</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="summary"
          maxLength={250}
          placeholder="Enter summary"
          defaultValue={data?.summary}
        />
      </Form.Group>

      <Editor
        ref={editorRef}
        initialValue={data?.content}
        apiKey="b92jxcyl79yhregu0pe6kjx9sgxrpokvrfnljk82mdabocl9"
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

      <Form.Group>
        <Form.File id="exampleFormControlFile1" label="Нүүр зураг" />
      </Form.Group>

      {categories && (
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Ангилал</Form.Label>
          <Form.Control as="select" name="category">
            {categories.map((e) => (
              <option key={e.id} value={e._id}>
                {e.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      )}
      {session?.user?.is_admin && (
        <Form.Group controlId="exampleForm.ControlSelect3">
          <Form.Label>Төлөв</Form.Label>
          <Form.Control as="select" name="status">
            <option value="approved" defaultChecked={data?.status === 'published' ? true : false}>Approve</option>
            <option value="draft" defaultChecked={data?.status === 'draft' ? true : false}>Draft</option>
          </Form.Control>
        </Form.Group>
      )}
      <Button variant="primary" type="submit" onSubmit={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
