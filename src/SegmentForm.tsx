import React, { useState } from "react";
import { Segment } from "./types";

interface SegmentFormProps {
  onSubmit: (segment: Segment) => void;
}

const SegmentForm: React.FC<SegmentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Segment>({
    name: "",
    description: "",
    messageID: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", description: "", messageID: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">Add Segment</button>
    </form>
  );
};

export default SegmentForm;
