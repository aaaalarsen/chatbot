'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  RefreshCw, 
  ZoomIn, 
  ZoomOut, 
  Send, 
  MessageCircle,
  Volume2,
  Loader2
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '【取引種別選択】\n\nご希望の取引を選択してください。\n1. 預入\n2. 払出\n3. 振込',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [isListening, setIsListening] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isWaitingForResponse]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'ja-JP';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // アニメーション効果を追加
    setTimeout(() => {
      setMessages([
        {
          id: '1',
          text: '【取引種別選択】\n\nご希望の取引を選択してください。\n1. 預入\n2. 払出\n3. 振込',
          isUser: false,
          timestamp: new Date()
        }
      ]);
      setInputText('');
      setFontSize(16);
      setShowKeypad(false);
      setIsWaitingForResponse(false);
      setIsRefreshing(false);
    }, 500);
  };

  const handleZoomIn = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const handleZoomOut = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsWaitingForResponse(true);
    
    // Simulate bot response with typing indicator
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: getBotResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsWaitingForResponse(false);
    }, 2000);

    setInputText('');
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase().trim();
    
    if (input === '1' || input.includes('預入')) {
      return '【預入金額入力】\n\n預入金額を入力してください。\n\n※1円単位でご入力ください。';
    } else if (input === '2' || input.includes('払出')) {
      return '【払出金額入力】\n\n払出金額を入力してください。\n\n※1円単位でご入力ください。';
    } else if (input === '3' || input.includes('振込')) {
      return '【振込先入力】\n\n振込先口座番号を入力してください。\n\n※ハイフンなしでご入力ください。';
    } else if (/^\d+$/.test(input)) {
      return `【確認画面】\n\n入力された金額: ${parseInt(input).toLocaleString()}円\n\nこちらの内容でよろしいですか？\n\n1. はい\n2. いいえ`;
    } else {
      return 'ご質問いただき、ありがとうございます。\n\n詳しい内容については担当者にお問い合わせください。\n\nまたは、メニューから選択してください。';
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleKeypadInput = (value: string) => {
    if (value === 'clear') {
      setInputText('');
    } else if (value === 'backspace') {
      setInputText(prev => prev.slice(0, -1));
    } else {
      setInputText(prev => prev + value);
    }
  };

  const keypadButtons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['clear', '0', 'backspace']
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced Background Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/20 to-black/30 backdrop-blur-[1px]" />
      
      {/* Top Controls with Enhanced Design */}
      <div className="absolute top-6 left-6 z-10">
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          size="lg"
          className={`bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-2xl backdrop-blur-sm border border-green-400/30 transition-all duration-300 ${
            isRefreshing ? 'animate-spin' : 'hover:scale-105'
          }`}
          style={{
            boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Enhanced Language Badge */}
      <div className="absolute top-6 right-6 z-10">
        <div 
          className="bg-gradient-to-r from-green-100 to-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-semibold shadow-xl backdrop-blur-sm border border-green-200/50"
          style={{
            boxShadow: '0 8px 25px -5px rgba(34, 197, 94, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.3)'
          }}
        >
          🇯🇵 日本語
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Messages Area with Enhanced Scrolling - スクロールバー非表示 */}
        <div className="flex-1 overflow-y-auto p-6 pt-24 pb-48 scrollbar-hide">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <Card
                  className={`max-w-md p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${
                    message.isUser
                      ? 'bg-gradient-to-br from-green-100/95 to-green-50/95 text-green-900 ml-auto border-green-200/50'
                      : 'bg-gradient-to-br from-white/95 to-gray-50/95 text-gray-900 border-gray-200/50'
                  }`}
                  style={{ 
                    fontSize: `${fontSize}px`,
                    boxShadow: message.isUser 
                      ? '0 20px 40px -10px rgba(34, 197, 94, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.4)'
                      : '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.4)'
                  }}
                >
                  <div className="whitespace-pre-line leading-relaxed font-medium">
                    {message.text}
                  </div>
                  <div className="text-xs opacity-60 mt-3 flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {message.timestamp.toLocaleTimeString('ja-JP', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </Card>
              </div>
            ))}
            
            {/* 返答待ちスピナー */}
            {isWaitingForResponse && (
              <div className="flex justify-start animate-fade-in">
                <Card
                  className="max-w-md p-5 shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-50/95 text-gray-900 border-gray-200/50"
                  style={{
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.4)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">返答を準備中...</span>
                  </div>
                </Card>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Ultra-Enhanced Floating Input Area */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="mx-6 mb-6">
            <div 
              className="bg-gradient-to-t from-white via-white/98 to-gray-50/95 backdrop-blur-2xl border border-gray-200/60 rounded-3xl p-8 transition-all duration-300 hover:shadow-3xl"
              style={{
                boxShadow: '0 35px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.9), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="max-w-4xl mx-auto">
                {/* Enhanced Keypad Toggle */}
                <div className="flex justify-center mb-6">
                  <Button
                    onClick={() => setShowKeypad(!showKeypad)}
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-white to-gray-50 backdrop-blur-sm border-gray-300 hover:from-gray-50 hover:to-gray-100 shadow-lg transition-all duration-200 hover:scale-105 font-medium"
                  >
                    {showKeypad ? '📝 テキスト入力' : '🔢 数字入力'}
                  </Button>
                </div>

                {/* Enhanced Numeric Keypad */}
                {showKeypad && (
                  <div className="bg-gradient-to-br from-white/98 to-gray-50/95 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-gray-200/60 animate-fade-in"
                    style={{
                      boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.9)'
                    }}
                  >
                    <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                      {keypadButtons.map((row, rowIndex) => (
                        row.map((key) => (
                          <Button
                            key={key}
                            onClick={() => handleKeypadInput(key)}
                            variant="outline"
                            className="h-14 text-xl font-bold bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-blue-100 border-gray-300 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
                          >
                            {key === 'clear' ? '🗑️' : key === 'backspace' ? '⌫' : key}
                          </Button>
                        ))
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Text Input */}
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="メッセージを入力してください..."
                      className="bg-gradient-to-r from-white/98 to-gray-50/95 backdrop-blur-sm border-gray-300 text-lg h-14 shadow-lg transition-all duration-200 focus:shadow-xl focus:scale-[1.02] font-medium"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={isWaitingForResponse}
                      style={{
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isWaitingForResponse}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-14 px-6 shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      boxShadow: '0 8px 25px -5px rgba(59, 130, 246, 0.4)'
                    }}
                  >
                    {isWaitingForResponse ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Send className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Left Controls */}
      <div className="absolute bottom-40 left-6 z-10 flex flex-col gap-3">
        <Button
          onClick={handleZoomOut}
          size="lg"
          variant="outline"
          className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl shadow-2xl border-gray-300/60 hover:scale-110 transition-all duration-200"
          style={{
            boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.4)'
          }}
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button
          onClick={handleZoomIn}
          size="lg"
          variant="outline"
          className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl shadow-2xl border-gray-300/60 hover:scale-110 transition-all duration-200"
          style={{
            boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.4)'
          }}
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
      </div>

      {/* Ultra-Enhanced Voice Button */}
      <div className="absolute bottom-40 right-6 z-10">
        <Button
          onClick={handleVoiceInput}
          size="lg"
          className={`shadow-2xl backdrop-blur-xl transition-all duration-300 w-18 h-18 rounded-full border-2 ${
            isListening 
              ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse border-red-300 scale-110' 
              : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 border-gray-500 hover:scale-110'
          } text-white`}
          style={{
            boxShadow: isListening 
              ? '0 20px 40px -10px rgba(239, 68, 68, 0.6), 0 0 20px rgba(239, 68, 68, 0.3)'
              : '0 20px 40px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="relative">
            {isListening ? (
              <Volume2 className="h-8 w-8 animate-pulse" />
            ) : (
              <div className="flex flex-col items-center">
                {/* Enhanced Microphone Icon */}
                <div className="w-6 h-8 rounded-t-full border-3 border-current relative">
                  <div className="absolute inset-x-1 top-1 bottom-2 bg-current rounded-t-full opacity-70"></div>
                </div>
                <div className="w-8 h-2 border-b-3 border-current mt-1 relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-3 bg-current"></div>
                </div>
              </div>
            )}
          </div>
        </Button>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}