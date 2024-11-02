import React, { useRef, useEffect } from 'react';
import { Download, Video } from 'lucide-react';
import { CanvasCapture } from 'canvas-capture';

interface VideoGeneratorProps {
  quiz: {
    title: string;
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

export default function VideoGenerator({ quiz }: VideoGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generating, setGenerating] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const generateVideo = async () => {
    if (!canvasRef.current || !quiz.questions.length) return;
    
    setGenerating(true);
    setProgress(0);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    // Configure canvas capture
    CanvasCapture.init(canvas, { fps: 30, name: 'quiz-video' });
    
    // Start recording
    CanvasCapture.beginVideoRecord();
    
    // Title screen
    await renderFrame(ctx, () => {
      drawBackground(ctx);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(quiz.title, canvas.width / 2, canvas.height / 2);
    }, 60); // 2 seconds

    // Render each question
    for (let i = 0; i < quiz.questions.length; i++) {
      setProgress((i / quiz.questions.length) * 100);
      
      // Question screen
      await renderFrame(ctx, () => {
        drawBackground(ctx);
        drawQuestion(ctx, quiz.questions[i], -1);
      }, 90); // 3 seconds
      
      // Show options one by one
      for (let j = 0; j < quiz.questions[i].options.length; j++) {
        await renderFrame(ctx, () => {
          drawBackground(ctx);
          drawQuestion(ctx, quiz.questions[i], j);
        }, 30); // 1 second per option
      }
      
      // Show correct answer
      await renderFrame(ctx, () => {
        drawBackground(ctx);
        drawQuestion(ctx, quiz.questions[i], quiz.questions[i].options.length - 1, true);
      }, 60); // 2 seconds
    }
    
    // Stop recording
    CanvasCapture.stopRecord();
    setGenerating(false);
    setProgress(100);
  };

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
    gradient.addColorStop(0, '#c026d3');
    gradient.addColorStop(1, '#7c3aed');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const drawQuestion = (
    ctx: CanvasRenderingContext2D,
    question: { question: string; options: string[]; correctAnswer: number },
    visibleOptions: number,
    showAnswer = false
  ) => {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(question.question, ctx.canvas.width / 2, 100);

    const visibleOptionCount = Math.min(visibleOptions + 1, question.options.length);
    
    for (let i = 0; i < visibleOptionCount; i++) {
      const y = 200 + i * 80;
      const isCorrect = showAnswer && i === question.correctAnswer;
      
      ctx.fillStyle = isCorrect ? '#4ade80' : '#ffffff';
      ctx.fillRect(100, y, ctx.canvas.width - 200, 60);
      
      ctx.fillStyle = '#000000';
      ctx.font = '24px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(question.options[i], 120, y + 35);
    }
  };

  const renderFrame = async (
    ctx: CanvasRenderingContext2D,
    render: () => void,
    frames: number
  ) => {
    for (let i = 0; i < frames; i++) {
      render();
      CanvasCapture.recordFrame();
    }
  };

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={1080}
        height={1920}
        className="w-full aspect-[9/16] bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-lg"
      />
      
      <div className="flex justify-between items-center">
        <button
          onClick={generateVideo}
          disabled={generating || !quiz.questions.length}
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Video className="w-5 h-5" />
          <span>{generating ? 'Generating...' : 'Generate Video'}</span>
        </button>
        
        {generating && (
          <div className="flex items-center space-x-2">
            <div className="w-48 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}