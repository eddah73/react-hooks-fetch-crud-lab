import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      // console.log('Success:', response);
      const updatedQuestions = questions.filter(question => question.id !== id);
      setQuestions(updatedQuestions);
    })
  }
  //handleCorrectAnswerChange r
  function handleUpdatedAnswer(id,value){
    
    
    fetch(`http://localhost:4000/questions/${id}`,{
        method:'PATCH',
        headers:{
          "Content-Type": "application/json" 
        },
        body:JSON.stringify({
          "correctIndex":value
          })      

    })
    .then(response => response.json())
    .then(updatedData => {
      
      const updatedQuestions = questions.map(question => {
        if (question.id === id) {
          return {
            ...question,
            ...updatedData
          };
        } else {
          return question;
        }
      });
      setQuestions(updatedQuestions);
    })
   

  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdateAnswer={handleUpdatedAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
