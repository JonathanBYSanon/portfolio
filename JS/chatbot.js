// Simple Portfolio Chatbot - Two Modes Only

const API_CONFIG = {
  key: "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",
  url: "https://openrouter.ai/api/v1/chat/completions",
  model: "google/gemini-2.0-flash-exp:free",
};

// Pre-saved responses for common questions
const RESPONSES = {
  projects:
    "Jonathan has some amazing projects! 🚀 His My Biblio App is a full-stack React/Node.js library system, Le Banquier and Letter Clash are C# desktop games actually used by his school, and he's got web projects like Tijwet and Green Data too!",

  skills:
    "Jonathan's got skills! 💪 He works with React, Node.js, Vue.js, C#, SwiftUI, SQL, Azure, and more. He's bilingual too (English/French) and just graduated from La Cité Collégiale!",

  contact:
    "Easy! 📧 You can reach Jonathan at jonathansanonpro@gmail.com, check out his LinkedIn, or find all his contact details in the footer section below!",

  resume:
    "You can download Jonathan's resume in the footer section! 📄 There's both an English and French version available.",

  experience:
    "Jonathan just graduated from La Cité Collégiale in 2025 with comprehensive full-stack development training! 🎓 He's built real-world projects including games actually used by his school.",

  education:
    "Jonathan graduated from La Cité Collégiale in Ottawa in 2025! 🏫 He completed a comprehensive full-stack development program and is bilingual in English and French.",

  location:
    "Jonathan is based in Ottawa, Canada! 🍁 He's totally willing to relocate anywhere in Canada and is also open to remote work opportunities.",

  availability:
    "Jonathan is actively looking for opportunities! 🚀 He's a recent graduate (2025) and available for full-time positions, internships, or freelance projects.",

  github:
    "You can check out Jonathan's code on GitHub! 💻 His projects showcase React, Node.js, C#, and more. Look for links in the footer or contact him directly!",

  technologies:
    "Jonathan works with modern tech! ⚡ Frontend: React, Vue.js, HTML/CSS, JavaScript. Backend: Node.js, C#, .NET. Plus SwiftUI for mobile and Azure for cloud!",
};

class SimpleChatbot {
  constructor() {
    this.isOpen = false;
    this.isTyping = false;
    this.init();
  }

  init() {
    // Get elements
    this.button = document.getElementById("chatToggle");
    this.overlay = document.getElementById("chatOverlay");
    this.modal = document.getElementById("chatModal");
    this.close = document.getElementById("chatClose");
    this.messages = document.getElementById("chatMessages");
    this.input = document.getElementById("chatInput");
    this.send = document.getElementById("chatSend");

    // Event listeners
    this.button.addEventListener("click", () => this.toggle());
    this.overlay.addEventListener("click", () => this.closeChat());
    this.close.addEventListener("click", () => this.closeChat());
    this.send.addEventListener("click", () => this.sendMessage());

    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Quick actions
    document.querySelectorAll(".quick-action").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        const questionText = this.getQuestionText(action);

        // Show user question first
        this.addUserMessage(questionText);

        // Then show bot response
        setTimeout(() => {
          this.addBotMessage(RESPONSES[action]);
        }, 500);
      });
    });
  }

  toggle() {
    this.isOpen ? this.closeChat() : this.openChat();
  }

  openChat() {
    this.isOpen = true;
    this.button.classList.add("active");
    this.overlay.classList.add("active");
    this.modal.classList.add("active");
    this.input.focus();
  }

  closeChat() {
    this.isOpen = false;
    this.button.classList.remove("active");
    this.overlay.classList.remove("active");
    this.modal.classList.remove("active");
  }

  async sendMessage() {
    const text = this.input.value.trim();
    if (!text || this.isTyping) return;

    this.addUserMessage(text);
    this.input.value = "";
    this.showTyping();

    // Try API first, fallback to pre-saved if failed
    try {
      const response = await this.callAPI(text);
      this.addBotMessage(response);
    } catch (error) {
      this.addBotMessage("Jonathan's on a budget right now, I'm offline! 💸");
      // Still give a helpful pre-saved response
      const fallback = this.getPreSavedResponse(text);
      if (fallback) this.addBotMessage(fallback);
    }

    this.hideTyping();
  }

  async callAPI(message) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_CONFIG.key}`,
      "HTTP-Referer": "https://jonathansanon.com",
      "X-Title": "Portfolio Chatbot",
    };

    const messages = [
      {
        role: "system",
        content: `You are Jonathan Sanon's friendly portfolio assistant. Be conversational and answer ONLY what's asked - don't dump all information at once!

ABOUT JONATHAN:
Full name: Jonathan ben-Yviaud Sanon | Born: 1999 | nationality: Haitian | location: Canada | Full-stack developer | Graduated La Cité Collégiale 2025 | Bilingual (English/French) | Contact: jonathansanonpro@gmail.com

SKILLS: React, Vue.js, Node.js, C#, .NET, SwiftUI, JavaScript/TypeScript, SQL, Azure, HTML/CSS

PROJECTS: My Biblio App (React/Node.js library system), Le Banquier & Letter Clash (C# games used by his school), Tijwet, Green Data, Car Dealership System

CONVERSATION RULES:
- Answer ONLY the specific question asked
- Keep responses to 1-2 sentences maximum  
- Be friendly but focused
- If they ask about projects, mention 1-2 relevant ones, not all
- If they ask about skills, mention the most relevant ones for their question
- Don't list everything unless specifically asked for "all" or "everything"
- Use light emojis (1 max per response)
- Encourage follow-up questions for more details`,
      },
      {
        role: "user",
        content: message,
      },
    ];

    // Try primary model first
    try {
      const response = await fetch(API_CONFIG.url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          model: API_CONFIG.model,
          messages: messages,
          max_tokens: 200,
        }),
      });

      if (response.status === 429) {
        // Rate limited - try fallback model
        throw new Error("Rate limited");
      }

      if (!response.ok) throw new Error("Primary API failed");

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      if (error.message === "Rate limited") {
        // Try fallback model
        const fallbackResponse = await fetch(API_CONFIG.url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            model: "mistralai/mixtral-8x7b-instruct",
            messages: messages,
            max_tokens: 200,
          }),
        });

        if (!fallbackResponse.ok) throw new Error("Fallback API failed");

        const fallbackData = await fallbackResponse.json();
        return fallbackData.choices[0].message.content;
      }
      throw error;
    }
  }

  getQuestionText(action) {
    const questions = {
      projects: "Tell me about Jonathan's projects",
      skills: "What are Jonathan's skills?",
      contact: "How can I contact Jonathan?",
      resume: "Where can I find Jonathan's resume?",
      experience: "What's Jonathan's experience?",
      education: "Tell me about Jonathan's education",
      location: "Where is Jonathan located?",
      availability: "Is Jonathan available for work?",
      github: "Where can I see Jonathan's code?",
      technologies: "What technologies does Jonathan use?",
    };
    return questions[action] || "Tell me more";
  }

  getPreSavedResponse(text) {
    const msg = text.toLowerCase();
    if (msg.includes("project")) return RESPONSES.projects;
    if (msg.includes("skill") || msg.includes("tech")) return RESPONSES.skills;
    if (msg.includes("contact") || msg.includes("email"))
      return RESPONSES.contact;
    if (msg.includes("resume") || msg.includes("cv")) return RESPONSES.resume;
    return null;
  }

  addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "message user";
    div.textContent = text;
    this.messages.appendChild(div);
    this.scroll();
  }

  addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "message bot";
    div.textContent = text;
    this.messages.appendChild(div);
    this.scroll();
  }

  showTyping() {
    this.isTyping = true;
    const div = document.createElement("div");
    div.className = "typing-indicator";
    div.id = "typing";
    div.innerHTML = `
      <span>Thinking...</span>
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    this.messages.appendChild(div);
    this.scroll();
  }

  hideTyping() {
    this.isTyping = false;
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
  }

  scroll() {
    setTimeout(
      () => (this.messages.scrollTop = this.messages.scrollHeight),
      100
    );
  }
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  new SimpleChatbot();
});
