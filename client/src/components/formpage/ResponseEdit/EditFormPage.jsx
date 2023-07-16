import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";

const EditFormPage = () => {
  const { formId } = useParams();
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/getPoll/${formId}`
        );
        setFormTitle(response.data.title);
        setFormDescription(response.data.description);

        const questionsResponse = await axios.get(
          `http://localhost:4000/getQuestions/${formId}`
        );
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFormData();
  }, [formId]);

  const updateForm = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/updateForm/${formId}`,
        {
          title: formTitle,
          description: formDescription,
          questions,
        }
      );
      navigate("/forms");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question_text: "" }]);
  };

  const handleQuestionTextChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question_text = event.target.value;
    setQuestions(newQuestions);
  };

  return (
    <div>
      <h2>Edit Form</h2>
      <TextField
        label="Title"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
      />
      <TextField
        label="Description"
        value={formDescription}
        onChange={(e) => setFormDescription(e.target.value)}
      />
      {questions.map((question, index) => (
        <div key={index}>
          <TextField
            label={`Question ${index + 1}`}
            value={question.question_text}
            onChange={(e) => handleQuestionTextChange(e, index)}
          />
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddQuestion}>
        Add Question
      </Button>
      <Button variant="contained" color="secondary" onClick={updateForm}>
        Update Form
      </Button>
    </div>
  );
};

export default EditFormPage;
