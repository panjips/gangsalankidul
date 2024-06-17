import React from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export const RichTextEditor = ({ ...props }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  function handleChange(e) {
    props.setValue((prev) => ({ ...prev, berita: e }));
  }

  return (
    <div>
      <ReactQuill
        value={props.value.berita ? props.value.berita : ""}
        className="quill"
        modules={modules}
        formats={formats}
        theme="snow"
        onChange={handleChange}
      />
    </div>
  );
};
