"use client";

import { MessageCircle } from "lucide-react";

export default function OpenChatButton({ className = "teal-button" }: { className?: string }) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("ae-global-open-chat"))}
    >
      Chat with Mimi <MessageCircle size={17} aria-hidden="true" />
    </button>
  );
}
