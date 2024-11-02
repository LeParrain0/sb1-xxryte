import React from 'react';
import { Share2 } from 'lucide-react';

export default function QuizPreview({ quiz }) {
  if (!quiz.questions.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 h-full flex items-center justify-center">
        <p className="text-gray-500 text-center">
          Add questions to preview your quiz here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Quiz Preview</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Share2 className="w-5 h-5" />
          <span>Share Quiz</span>
        </button>
      </div>

      <div className="space-y-6">
        {quiz.title && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800">{quiz.title}</h3>
          </div>
        )}

        {quiz.videoUrl && (
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">TikTok Video Preview</p>
          </div>
        )}

        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-4">{question.question}</h4>
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-3 rounded-lg border ${
                      question.correctAnswer === optionIndex
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    } cursor-pointer transition-colors`}
                  >
                    {option || `Option ${optionIndex + 1}`}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}