import React, { useState } from 'react';
import { PlusCircle, Trash2, Video, Brain, Share2 } from 'lucide-react';
import QuizForm from './components/QuizForm';
import QuizPreview from './components/QuizPreview';
import VideoGenerator from './components/VideoGenerator';
import Header from './components/Header';

function App() {
  const [quiz, setQuiz] = useState({
    title: '',
    videoUrl: '',
    questions: []
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <QuizForm quiz={quiz} setQuiz={setQuiz} />
            <VideoGenerator quiz={quiz} />
          </div>
          <QuizPreview quiz={quiz} />
        </div>
      </main>
    </div>
  );
}

export default App;