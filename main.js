const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const fs = require('fs');
dotenv.config();

// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.API_KEY);

const modelId = "gemini-1.5-flash-latest";

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 200,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

const model = configuration.getGenerativeModel({ model: modelId, generationConfig });

async function summarizeText(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Load the research paper text
const researchPaperText = fs.readFileSync('research-paper.txt', 'utf-8');
const prompt = `Please summarize the following research paper on the impact of climate change on coastal ecosystems into 3-5 bullet points. Focus specifically on (1) the observed changes in marine life, (2) the economic impact on coastal communities, and (3) the authors' policy recommendations.\n\n${researchPaperText}`;

console.log(prompt);
// Run the summarization
summarizeText(prompt);
