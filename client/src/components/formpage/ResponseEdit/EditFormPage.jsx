import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditFormPage = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/${formId}`);
        setFormData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFormData();
  }, [formId]);

  const handleEdit = () => {
    history.push(`/forms/${formId}/edit`);
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Form: {formData.title}</h2>
      <h3>Form Description: {formData.description}</h3>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default EditFormPage;
