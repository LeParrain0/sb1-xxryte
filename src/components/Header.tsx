import React from 'react';
import { Brain } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              TikQuiz Creator
            </h1>
          </div>
          <p className="text-gray-600">Create viral TikTok quizzes in minutes</p>
        </div>
      </div>
    </header>
  );
}