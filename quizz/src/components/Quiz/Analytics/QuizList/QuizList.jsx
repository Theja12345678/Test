import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const QuizList = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure this is correctly set in your environment

  useEffect(() => {
    if (id) {
      fetchQuizAndQuestions(id);
    }
  }, [id]);

  const fetchQuizAndQuestions = async (quizId) => {
    try {
      console.log(`Fetching quiz data for quiz ID: ${quizId}`);
      const quizResponse = await axios.get(`${backendUrl}/quiz/${quizId}`);
      console.log('Quiz Response:', quizResponse.data);

      if (quizResponse.data) {
        setQuiz(quizResponse.data);

        console.log(`Fetching questions for quiz ID: ${quizId}`);
        const questionsResponse = await axios.get(`${backendUrl}/quiz/${quizId}/questions`);
        console.log('Questions Response:', questionsResponse.data);

        setQuestions(questionsResponse.data);
      } else {
        console.warn('No quiz data found');
      }

      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      setLoading(false); // Set loading to false in case of an error
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>No quiz found</div>;
  }

  return (
    <div>
      <h1>{quiz.quizName}</h1>
      <p>Created On: {new Date(quiz.createdAt).toLocaleDateString()}</p>
      <p>Impressions: {quiz.impressions}</p>
      <h2>Questions</h2>
      <ul>
        {questions.length > 0 ? (
          questions.map((question) => (
            <li key={question._id}>
              {question.text}
              <Link to={`/quiz/${quiz._id}`}>
                <button>Attempt Quiz</button>
              </Link>
            </li>
          ))
        ) : (
          <li>No questions available</li>
        )}
      </ul>
    </div>
  );
};

export default QuizList;
