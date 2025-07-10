import { GoogleGenerativeAI } from "@google/generative-ai";

// Load Gemini instance with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Convert uploaded file to base64 string
const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Analyze the uploaded image using Gemini AI
export const handleMedicalImageUpload = async (file, filetype) => {
  try {
    const base64Data = await readFileAsBase64(file);
    const imageParts = [
      {
        inlineData: {
          data: base64Data,
          mimeType: filetype,
        },
      },
    ];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = "Analyze this medical image and provide clinical insights.";
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;

    const analysis = await response.text();
    console.log("Gemini Analysis:", analysis);

    return analysis;
  } catch (error) {
    console.error("Error processing image with Gemini:", error);
    return "Failed to analyze image.";
  }
};
