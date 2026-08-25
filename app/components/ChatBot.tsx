"use client";

import Image from "next/image";
import { ChevronRight, Send, X } from "lucide-react";
import { Fragment, type FormEvent, type SyntheticEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
  options?: string[];
};

const starterOptions = [
  "Which countries can I compare?",
  "How does the application process work?",
  "Can you help with visa preparation?",
  "What support is available before departure?"
];

const followUpOptions = [
  {
    keywords: ["country", "countries", "destination", "destinations", "uk", "canada", "australia", "malaysia", "ireland"],
    options: [
      "Compare countries by budget",
      "Which destination fits my profile?",
      "Show me post-study planning factors"
    ]
  },
  {
    keywords: ["application", "apply", "sop", "documents", "deadline", "form"],
    options: [
      "What documents should I prepare?",
      "How can I organize deadlines?",
      "Can you help with SOP planning?"
    ]
  },
  {
    keywords: ["visa", "interview", "embassy", "permit"],
    options: [
      "What visa documents are usually needed?",
      "How should I prepare for visa steps?",
      "What happens after the offer letter?"
    ]
  },
  {
    keywords: ["scholarship", "fee", "fees", "budget", "cost", "money"],
    options: [
      "How do I compare tuition fees?",
      "Can I check scholarship options?",
      "How should I plan my budget?"
    ]
  },
  {
    keywords: ["accommodation", "departure", "pre-departure", "travel", "arrival", "stay"],
    options: [
      "When should I plan accommodation?",
      "What should I do before flying?",
      "How do I prepare for arrival?"
    ]
  },
  {
    keywords: ["university", "course", "shortlist", "profile", "intake"],
    options: [
      "How do I build a shortlist?",
      "Which intake should I target?",
      "How do I compare course fit?"
    ]
  }
];

const defaultFollowUps = [
  "Help me choose my next step",
  "How do I start my study abroad plan?",
  "What should AE Global Group review first?"
];

const getContextualOptions = (question: string) => {
  const normalizedQuestion = question.toLowerCase();
  const matchedOptions = followUpOptions.find((item) =>
    item.keywords.some((keyword) => normalizedQuestion.includes(keyword))
  )?.options ?? defaultFollowUps;

  return matchedOptions.filter((option) => option.toLowerCase() !== normalizedQuestion).slice(0, 3);
};

const welcomeMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I am Mimi. Tell me what you need help with, or choose one of these options to get started.",
  options: starterOptions
};

const formatMessageLines = (content: string) =>
  content
    .replace(/\s+(\d+\.\s)/g, "\n$1")
    .replace(/\s+-\s+/g, "\n- ")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

const renderInlineFormatting = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return <Fragment key={`${part}-${index}`}>{part.replace(/\*\*/g, "")}</Fragment>;
  });

const renderMessageContent = (content: string) => {
  const lines = formatMessageLines(content);

  if (lines.length === 1) {
    return renderInlineFormatting(lines[0]);
  }

  return (
    <span className="chat-message-content">
      {lines.map((line, index) => {
        const numberedMatch = line.match(/^(\d+)\.\s*(.+)$/);
        const bulletMatch = line.match(/^-\s*(.+)$/);

        if (numberedMatch) {
          return (
            <span className="chat-step-line" key={`${line}-${index}`}>
              <span className="chat-step-number">{numberedMatch[1]}</span>
              <span>{renderInlineFormatting(numberedMatch[2])}</span>
            </span>
          );
        }

        if (bulletMatch) {
          return (
            <span className="chat-bullet-line" key={`${line}-${index}`}>
              <span aria-hidden="true" />
              <span>{renderInlineFormatting(bulletMatch[1])}</span>
            </span>
          );
        }

        return (
          <span className="chat-text-line" key={`${line}-${index}`}>
            {renderInlineFormatting(line)}
          </span>
        );
      })}
    </span>
  );
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [canShowChat, setCanShowChat] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const keepScrollInsideChat = (event: SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const updateChatVisibility = () => {
      const destinations = document.getElementById("destinations");

      if (!destinations) {
        setCanShowChat(true);
        return;
      }

      const showAfter = destinations.offsetTop + destinations.offsetHeight - window.innerHeight * 0.15;
      setCanShowChat((wasVisible) => wasVisible || window.scrollY >= showAfter);
    };

    updateChatVisibility();
    window.addEventListener("scroll", updateChatVisibility, { passive: true });
    window.addEventListener("resize", updateChatVisibility);

    return () => {
      window.removeEventListener("scroll", updateChatVisibility);
      window.removeEventListener("resize", updateChatVisibility);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const askQuestion = async (question: string) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isSending) return;

    const nextMessages: ChatMessage[] = [
      ...messages.map(({ role, content }) => ({ role, content })),
      { role: "user", content: trimmedQuestion }
    ];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content }))
        })
      });

      const data = await response.json() as { reply?: string };
      const nextOptions = getContextualOptions(trimmedQuestion);

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            data.reply ??
            "I can help with study destinations, applications, visa prep and pre-departure support. Here are a few useful next questions for this topic.",
          options: nextOptions
        }
      ]);
    } catch {
      const nextOptions = getContextualOptions(trimmedQuestion);

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "I could not connect right now, but I can still help with this topic from the website content. These next questions may help.",
          options: nextOptions
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void askQuestion(input);
  };

  const openChat = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsClosing(false);
    setIsOpen(true);
  };

  const closeChat = () => {
    if (isClosing) return;

    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, 230);
  };

  useEffect(() => {
    if (!isOpen) return;

    const messagesElement = messagesRef.current;
    if (!messagesElement) return;

    requestAnimationFrame(() => {
      messagesElement.scrollTo({
        top: messagesElement.scrollHeight,
        behavior: "smooth"
      });
    });
  }, [isOpen, messages, isSending]);

  if (!canShowChat) {
    return null;
  }

  const latestAssistantOptionsIndex = messages.reduce((latestIndex, message, index) => (
    message.role === "assistant" && message.options?.length ? index : latestIndex
  ), -1);

  return (
    <div className="chat-widget">
      {isOpen ? (
        <section
          className={`chat-panel ${isClosing ? "is-closing" : ""}`}
          aria-label="Mimi chat"
          onWheel={keepScrollInsideChat}
          onTouchMove={keepScrollInsideChat}
        >
          <header className="chat-header">
            <span className="chat-avatar" aria-hidden="true">
              <Image
                src="/images/mimi-chatbot.png"
                alt=""
                width={58}
                height={58}
                sizes="58px"
              />
            </span>
            <div>
              <strong>Mimi</strong>
              <small>Study abroad assistant</small>
            </div>
            <button type="button" aria-label="Close chat" onClick={closeChat}>
              <X size={18} />
            </button>
          </header>

          <div className="chat-messages" aria-live="polite" ref={messagesRef}>
            {messages.map((message, index) => (
              <div className={`chat-message-group ${message.role}`} key={`${message.role}-${index}`}>
                <p className={`chat-message ${message.role}`}>
                  {renderMessageContent(message.content)}
                </p>
                {message.options?.length && index === latestAssistantOptionsIndex ? (
                  <div className="chat-options" aria-label="Suggested questions">
                    {message.options.map((option) => (
                      <button type="button" key={option} onClick={() => askQuestion(option)}>
                        <span>{option}</span>
                        <ChevronRight size={14} />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {isSending ? (
              <div className="chat-message-group assistant">
                <p className="chat-message assistant">Thinking...</p>
              </div>
            ) : null}
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              aria-label="Ask Mimi"
              placeholder="Ask about studying abroad..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit" aria-label="Send message" disabled={isSending || !input.trim()}>
              <Send size={17} />
            </button>
          </form>
        </section>
      ) : null}

      {!isOpen ? (
        <button className="chat-toggle" type="button" aria-label="Open Mimi chat" onClick={openChat}>
          <Image
            src="/images/mimi-chatbot.png"
            alt=""
            width={128}
            height={150}
            sizes="128px"
            aria-hidden="true"
          />
          <span aria-hidden="true">Ask Me</span>
        </button>
      ) : null}
    </div>
  );
}
