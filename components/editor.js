import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import { signIn, signOut, useSession } from "next-auth/client";
import Router from "next/router";
export default function MyEditor({ categories }) {
  const [session, loading] = useSession();

  const [editorValue, setValue] = useState(null);
  const [load, setLoading] = useState(false);

  const editorRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: e.currentTarget.title.value,
      summary: e.currentTarget.summary.value,
      content: editorValue,
      category: e.currentTarget.category.value,
    };
    setLoading(true);

    try {
      const res = await fetch("http://localhost:9000/api/v1/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setLoading(false);
        Router.push("/dashboard");
      } else {
        setLoading(false);
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
    }
  };

  const handleEditorChange = (e) => {
    setValue(e.target.getContent());
  };

  return load ? (
    <div>loading...</div>
  ) : (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Гарчиг</Form.Label>
        <Form.Control type="text" placeholder="Enter title" name="title" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Хураангуй</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="summary"
          maxLength={250}
          placeholder="Enter summary"
        />
      </Form.Group>

      <Editor
        ref={editorRef}
        initialValue=""
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
            {categories.map((e) => 
                <option key={e.id} value={e.id}>{e.name}</option>
            )}
          </Form.Control>
        </Form.Group>
      )}
      <Button variant="primary" type="submit" onSubmit={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
