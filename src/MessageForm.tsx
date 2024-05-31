import React, { useState } from "react";
import { MessageFormData } from "./types";

interface MessageFormProps {
  onSubmit: (formData: MessageFormData) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<MessageFormData>({
    title: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MessageForm;
