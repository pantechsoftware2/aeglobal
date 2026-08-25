type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const siteContext = `
AE Global Group provides study abroad counseling for students who want clear options and no guesswork.
The chatbot assistant is named Mimi.
The website covers study destinations, university/course shortlisting, applications, scholarships, visa guidance, accommodation, and pre-departure support.
Key destinations shown include United Kingdom, Australia, Canada, Malaysia, Ireland, Germany, United Arab Emirates, New Zealand, Malta, and France.
The process is Audit, Shortlist, Apply, Visa Prep, and Depart.
Keep answers concise, practical, friendly, and focused on AE Global Group's study abroad services.
Use the user's details from the conversation, including their name, target country, study level, budget, timeline, documents, or concerns.
Give personalized next-step guidance when the user shares personal information. Do not say you cannot personalize unless the user asks for a guaranteed decision.
If important details are missing, ask one clear follow-up question and still give a useful next step.
Format replies for a small chat bubble: one short opening sentence, then up to four numbered lines when steps are useful, then one short follow-up question if needed.
Avoid Markdown symbols such as **, ##, tables, or long paragraphs.
Do not answer unrelated general questions such as recipes, entertainment, coding, sports, politics, or medical advice. Briefly redirect those back to study abroad help.
Do not promise admissions, scholarships, visas, or guaranteed outcomes.
`;

const domainKeywords = [
  "abroad",
  "study",
  "student",
  "university",
  "college",
  "course",
  "program",
  "intake",
  "admission",
  "application",
  "apply",
  "sop",
  "document",
  "deadline",
  "visa",
  "scholarship",
  "fee",
  "fees",
  "budget",
  "accommodation",
  "pre-departure",
  "departure",
  "travel",
  "ielts",
  "pte",
  "offer letter",
  "shortlist",
  "career",
  "ae global",
  "counseling",
  "counselling"
];

const destinationKeywords = [
  "uk",
  "united kingdom",
  "australia",
  "canada",
  "malaysia",
  "ireland",
  "germany",
  "uae",
  "united arab emirates",
  "new zealand",
  "malta",
  "france"
];

const unrelatedKeywords = [
  "cook",
  "cooking",
  "recipe",
  "omelet",
  "omelette",
  "egg",
  "food",
  "movie",
  "song",
  "game",
  "sports",
  "cricket",
  "football",
  "code",
  "programming",
  "politics",
  "medicine",
  "doctor"
];

const fallbackReplies = [
  {
    keywords: ["country", "countries", "destination", "destinations", "uk", "canada", "australia"],
    reply: "You can compare destinations such as the UK, Australia, Canada, Malaysia, Ireland, Germany, UAE, New Zealand, Malta and France. AE Global Group helps compare course fit, budget, intake timing, visa path and post-study plans before you choose."
  },
  {
    keywords: ["application", "apply", "sop", "documents", "deadline"],
    reply: "The application support focuses on forms, SOPs, supporting documents and deadlines. The goal is to keep everything organized before you submit."
  },
  {
    keywords: ["visa", "interview"],
    reply: "AE Global Group can guide you through visa preparation by helping you understand required documents, timelines and practical next steps. Visa outcomes cannot be guaranteed."
  },
  {
    keywords: ["scholarship", "fee", "fees", "budget"],
    reply: "Scholarship and budget guidance means reviewing available options, fees and practical fit for your profile. The team can help you compare choices before applying."
  },
  {
    keywords: ["accommodation", "departure", "pre-departure", "travel"],
    reply: "Support continues beyond offers with accommodation and pre-departure planning, including travel, arrival basics and settling-in preparation."
  }
];

const getFallbackReply = (question: string) => {
  const normalizedQuestion = question.toLowerCase();
  const match = fallbackReplies.find((item) =>
    item.keywords.some((keyword) => normalizedQuestion.includes(keyword))
  );

  return match?.reply ??
    "AE Global Group helps students with destination comparison, university shortlisting, applications, visa preparation, accommodation and pre-departure planning. Tell me what stage you are in, and I can suggest the next practical step.";
};

const isGreetingOnly = (question: string) =>
  /^(hi|hello|hey|good morning|good afternoon|good evening|namaste|thanks|thank you)\b/i.test(question.trim());

const isStudyAbroadQuestion = (question: string) => {
  const normalizedQuestion = question.toLowerCase();
  const hasDomainKeyword = domainKeywords.some((keyword) => normalizedQuestion.includes(keyword));
  const hasDestinationKeyword = destinationKeywords.some((keyword) => normalizedQuestion.includes(keyword));
  const hasUnrelatedKeyword = unrelatedKeywords.some((keyword) => normalizedQuestion.includes(keyword));

  if (hasUnrelatedKeyword && !hasDomainKeyword) {
    return false;
  }

  return hasDomainKeyword || hasDestinationKeyword || isGreetingOnly(question);
};

const getOutOfScopeReply = () =>
  "I can help with study abroad planning, destinations, universities, applications, visas, fees, accommodation and pre-departure support. For that question, I would rather keep Mimi focused on your study abroad next step.";

export async function POST(request: Request) {
  const body = await request.json() as { messages?: ChatMessage[] };
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  const question = latestUserMessage?.content ?? "";
  const apiKey = process.env.OPENAI_API_KEY;
  const apiUrl = process.env.OPENAI_CHAT_API_URL ?? "https://api.openai.com/v1/chat/completions";
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!isStudyAbroadQuestion(question)) {
    return Response.json({ reply: getOutOfScopeReply(), source: "site-scope" });
  }

  if (!apiKey) {
    return Response.json({ reply: getFallbackReply(question), source: "site-fallback" });
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-Title": "AE Global Group"
      },
      body: JSON.stringify({
        model,
        temperature: 0.45,
        max_tokens: 360,
        messages: [
          {
            role: "system",
            content: siteContext
          },
          ...messages.slice(-8)
        ]
      })
    });

    if (!response.ok) {
      return Response.json({ reply: getFallbackReply(question), source: "site-fallback" });
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    return Response.json({
      reply: data.choices?.[0]?.message?.content ?? getFallbackReply(question),
      source: "openai"
    });
  } catch {
    return Response.json({ reply: getFallbackReply(question), source: "site-fallback" });
  }
}
