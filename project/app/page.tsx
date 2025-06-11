"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Send,
  MessageCircle,
  Volume2,
  Loader2,
  Mic,
  MicOff,
  Radio,
  Palette,
  Type,
  RotateCcw,
  Home,
  HomeIcon,
  House,
  Building2,
  Hand,
  TouchpadIcon,
  PointerIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TypewriterText, TypewriterStyle } from "./components/TypewriterText";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// マイクボタンのデザインタイプを定義
type MicButtonDesign = "gradient-ripple" | "floating-card";

// マイクボタンのデザインコンポーネントを定義
interface MicButtonProps {
  isListening: boolean;
  onClick: () => void;
}

// グラデーションリップルボタン
const GradientRippleButton: React.FC<MicButtonProps> = ({
  isListening,
  onClick,
}) => (
  <Button
    onClick={onClick}
    size="lg"
    className={cn(
      "w-16 h-16 rounded-full shadow-xl transition-all duration-500 relative overflow-hidden border-0 fixed bottom-24 right-8 z-50",
      isListening
        ? "bg-gradient-to-br from-red-400 via-red-500 to-red-600"
        : "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
    )}
    style={{
      boxShadow: isListening
        ? "0 8px 16px -4px rgba(239, 68, 68, 0.5)"
        : "0 8px 16px -4px rgba(59, 130, 246, 0.5)",
    }}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      {isListening ? (
        <div className="relative">
          <MicOff className="h-8 w-8 text-white" />
          <div className="absolute -inset-1 bg-white/20 rounded-lg blur-sm animate-pulse" />
        </div>
      ) : (
        <div className="relative">
          <Mic className="h-8 w-8 text-white" />
          <div className="absolute -inset-4 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
    </div>
  </Button>
);

// フローティングカードボタン
const FloatingCardButton: React.FC<MicButtonProps> = ({
  isListening,
  onClick,
}) => (
  <Button
    onClick={onClick}
    size="lg"
    className={cn(
      "w-16 h-16 rounded-2xl shadow-2xl transition-all duration-500 hover:scale-110 relative overflow-hidden border-0 fixed bottom-24 right-8 z-50",
      isListening
        ? "bg-gradient-to-br from-red-400 via-red-500 to-red-600 rotate-45"
        : "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
    )}
    style={{
      boxShadow: isListening
        ? "0 8px 16px -4px rgba(239, 68, 68, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)"
        : "0 8px 16px -4px rgba(59, 130, 246, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
    }}
  >
    <div
      className={cn(
        "relative z-10 transition-all duration-500 flex items-center justify-center",
        isListening && "-rotate-45"
      )}
    >
      {isListening ? (
        <div className="relative">
          <MicOff className="h-8 w-8 text-white" />
          <div className="absolute -inset-1 bg-white/20 rounded-lg blur-sm animate-pulse" />
        </div>
      ) : (
        <div className="relative">
          <Mic className="h-8 w-8 text-white" />
          <div className="absolute -inset-4 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
    </div>
  </Button>
);

const typewriterStyles: { label: string; value: TypewriterStyle }[] = [
  { label: "シンプル", value: "simple" },
  { label: "可変速度", value: "variable-speed" },
  { label: "ブロック", value: "block" },
  { label: "フェード", value: "fade" },
  { label: "カーソル", value: "cursor" },
];

// ホームボタンのデザインタイプを定義
type HomeButtonDesign = "modern" | "classic" | "minimal" | "elegant";

// ホームボタンコンポーネント
const HomeButton: React.FC<{
  onClick: () => void;
  isRefreshing: boolean;
}> = ({ onClick, isRefreshing }) => (
  <Button
    onClick={onClick}
    disabled={isRefreshing}
    size="lg"
    className={cn(
      "w-20 h-20 rounded-full shadow-xl transition-all duration-300 relative overflow-hidden border-0 fixed top-6 left-5 z-50",
      "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600",
      "hover:scale-110"
    )}
    style={{
      boxShadow: "0 4px 20px 0 rgba(245, 158, 11, 0.5)",
    }}
  >
    <div className="absolute inset-0 rounded-full overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 bg-white/10",
          "transition-opacity duration-300",
          "hover:opacity-100 opacity-0"
        )}
      />
    </div>
    <div className="relative z-10 flex flex-col items-center justify-center">
      <Home className="h-10 w-10 text-white mb-1" />
      <RefreshCw
        className={cn("h-5 w-5 text-white/80", isRefreshing && "animate-spin")}
      />
    </div>
  </Button>
);

// アニメーション付き文字サイズトグルボタン
const FontSizeToggle: React.FC<{
  fontSize: number;
  onToggle: () => void;
}> = ({ fontSize, onToggle }) => {
  const isLarge = fontSize === 24;

  return (
    <Button
      variant="outline"
      onClick={onToggle}
      className={cn(
        "bg-white/95 hover:bg-white/80 relative transition-all duration-300",
        "w-24 h-10 rounded-full flex items-center justify-center gap-2 overflow-hidden fixed top-6 left-32 z-50",
        "border-2",
        isLarge ? "border-blue-500" : "border-gray-300"
      )}
      title="文字サイズ切り替え"
    >
      <div
        className={cn(
          "absolute inset-0 bg-blue-50 transition-transform duration-300",
          isLarge ? "translate-x-0" : "-translate-x-full"
        )}
      />
      <Type
        className={cn(
          "h-4 w-4 transition-all duration-300 relative",
          isLarge ? "text-blue-500 scale-125" : "text-gray-500 scale-100"
        )}
      />
      <span
        className={cn(
          "text-xs font-medium relative transition-all duration-300",
          isLarge ? "text-blue-500" : "text-gray-500"
        )}
      >
        {fontSize}px
      </span>
    </Button>
  );
};

// 波紋アニメーションのスタイル
const rippleKeyframes = `
  @keyframes ripple {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes tap {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(5px) scale(0.95);
    }
  }
`;

// タッチアイコンコンポーネント
const TouchIcon = () => (
  <div className="relative">
    {/* 波紋エフェクト */}
    <div className="absolute -inset-4">
      <div className="absolute inset-0 rounded-full bg-white/30 animate-ripple" />
      <div className="absolute inset-0 rounded-full bg-white/30 animate-ripple-delay" />
    </div>
    {/* 手のアイコン */}
    <div className="relative z-10 animate-tap rotate-[315deg]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      >
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
        <path d="M10 10V2a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    </div>
  </div>
);

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [isListening, setIsListening] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [micButtonDesign, setMicButtonDesign] =
    useState<MicButtonDesign>("gradient-ripple");
  const [typewriterStyle, setTypewriterStyle] =
    useState<TypewriterStyle>("simple");
  const [isChatStarted, setIsChatStarted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isWaitingForResponse]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "ja-JP";

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
          id: "1",
          text: "【取引種別選択】\n\nご希望の取引を選択してください。\n1. 預入\n2. 払出\n3. 振込",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setInputText("");
      setFontSize(16);
      setShowKeypad(false);
      setIsWaitingForResponse(false);
      setIsRefreshing(false);
    }, 500);
  };

  const toggleFontSize = () => {
    setFontSize((prev) => (prev === 16 ? 24 : 16));
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsWaitingForResponse(true);

    // Simulate bot response with typing indicator
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: getBotResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsWaitingForResponse(false);
    }, 2000);

    setInputText("");
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase().trim();

    if (input === "1" || input.includes("預入")) {
      return "【預入金額入力】\n\n預入金額を入力してください。\n\n※1円単位でご入力ください。";
    } else if (input === "2" || input.includes("払出")) {
      return "【払出金額入力】\n\n払出金額を入力してください。\n\n※1円単位でご入力ください。";
    } else if (input === "3" || input.includes("振込")) {
      return "【振込先入力】\n\n振込先口座番号を入力してください。\n\n※ハイフンなしでご入力ください。";
    } else if (/^\d+$/.test(input)) {
      return `【確認画面】\n\n入力された金額: ${parseInt(
        input
      ).toLocaleString()}円\n\nこちらの内容でよろしいですか？\n\n1. はい\n2. いいえ`;
    } else {
      return "ご質問いただき、ありがとうございます。\n\n詳しい内容については担当者にお問い合わせください。\n\nまたは、メニューから選択してください。";
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
    if (value === "clear") {
      setInputText("");
    } else if (value === "backspace") {
      setInputText((prev) => prev.slice(0, -1));
    } else {
      setInputText((prev) => prev + value);
    }
  };

  const keypadButtons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["clear", "0", "backspace"],
  ];

  // チャットを開始する関数
  const startChat = () => {
    setIsChatStarted(true);
    setMessages([
      {
        id: "1",
        text: "【取引種別選択】\n\nご希望の取引を選択してください。\n1. 預入\n2. 払出\n3. 振込",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/20 to-black/30 backdrop-blur-[1px]" />

      {/* Left side space */}
      <div className="fixed left-0 top-0 bottom-0 w-[400px] bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />

      {isChatStarted ? (
        // チャット画面
        <div className="relative z-10 min-h-screen ml-[400px]">
          {/* Semi-transparent background overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Font Size Toggle Button */}
          <FontSizeToggle fontSize={fontSize} onToggle={toggleFontSize} />

          {/* Home Button with Refresh functionality */}
          <HomeButton onClick={handleRefresh} isRefreshing={isRefreshing} />

          {/* Settings buttons */}
          <div className="fixed bottom-6 left-4 z-50 flex flex-col gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/95 hover:bg-white/80 w-12 h-12 rounded-full"
                  title="タイプライターエフェクト"
                >
                  <Type className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 bg-white/95 backdrop-blur-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">タイプライターエフェクト</h4>
                  <div className="flex flex-col gap-2">
                    {typewriterStyles.map((style) => (
                      <Button
                        key={style.value}
                        variant={
                          typewriterStyle === style.value ? "default" : "ghost"
                        }
                        className="justify-start"
                        onClick={() => setTypewriterStyle(style.value)}
                      >
                        {style.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/95 hover:bg-white/80 w-12 h-12 rounded-full"
                  title="マイクボタンデザイン"
                >
                  <Palette className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 bg-white/95 backdrop-blur-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">マイクボタンデザイン</h4>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={
                        micButtonDesign === "gradient-ripple"
                          ? "default"
                          : "ghost"
                      }
                      className="justify-start"
                      onClick={() => setMicButtonDesign("gradient-ripple")}
                    >
                      グラデーション
                    </Button>
                    <Button
                      variant={
                        micButtonDesign === "floating-card"
                          ? "default"
                          : "ghost"
                      }
                      className="justify-start"
                      onClick={() => setMicButtonDesign("floating-card")}
                    >
                      フローティング
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Chat content */}
          <div className="relative z-20 h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 pb-32 scrollbar-hide">
              <div className="max-w-3xl mx-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2 items-end mb-4",
                      message.isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "relative inline-block px-4 py-2 rounded-[22px]",
                        message.isUser
                          ? "bg-[#0B93F6] text-white"
                          : "bg-[#E9E9EB] text-black",
                        "before:absolute before:bottom-[2px]",
                        message.isUser
                          ? "before:-right-[6px] before:border-b-[20px] before:border-r-[20px] before:border-b-[#0B93F6] before:border-r-transparent before:rounded-bl-[12px]"
                          : "before:-left-[6px] before:border-b-[20px] before:border-l-[20px] before:border-b-[#E9E9EB] before:border-l-transparent before:rounded-br-[12px]"
                      )}
                      style={{
                        fontSize: `${fontSize}px`,
                      }}
                    >
                      <div className="whitespace-pre-wrap break-words">
                        {message.isUser ? (
                          message.text
                        ) : (
                          <TypewriterText
                            text={message.text}
                            style={typewriterStyle}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isWaitingForResponse && (
                  <div className="flex gap-2 items-end mb-4">
                    <div className="bg-[#E9E9EB] px-4 py-2 rounded-[22px] flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>入力中...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input area */}
            <div className="relative z-20 p-4 bg-white/60 backdrop-blur-md border-t border-white/20">
              <div className="max-w-3xl mx-auto">
                <div className="flex gap-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="メッセージを入力..."
                    className="flex-1 bg-white/95 backdrop-blur-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="shrink-0 bg-blue-500 hover:bg-blue-600 text-white"
                    disabled={!inputText.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating Mic Button */}
            {micButtonDesign === "gradient-ripple" ? (
              <GradientRippleButton
                isListening={isListening}
                onClick={handleVoiceInput}
              />
            ) : (
              <FloatingCardButton
                isListening={isListening}
                onClick={handleVoiceInput}
              />
            )}
          </div>
        </div>
      ) : (
        // 受付開始画面
        <div className="relative z-10 min-h-screen ml-[400px]">
          {/* Semi-transparent background overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* 受付開始ボタン */}
          <div
            className="h-screen flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors duration-300"
            onClick={startChat}
          >
            <div className="text-center relative z-10 mb-16">
              <h2 className="text-4xl font-medium text-white mb-4">
                受付を開始
              </h2>
              <p className="text-white/80">画面をタッチしてください</p>
            </div>

            {/* タッチアイコン */}
            <TouchIcon />
          </div>
        </div>
      )}

      <style jsx global>{`
        ${rippleKeyframes}

        .animate-ripple {
          animation: ripple 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-ripple-delay {
          animation: ripple 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 1s;
        }

        .animate-tap {
          animation: tap 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
