import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const handleMedicalImageUpload = async (file, filetype) => {
  if (!file) return "No file selected.";

  const allowedTypes = ["image/png", "image/jpeg"];
  if (!allowedTypes.includes(filetype)) {
    return "Only PNG and JPG image formats are supported.";
  }

  try {
    const base64Data = await readFileAsBase64(file);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "You are a medical diagnosis expert. Analyze this image and provide clear, patient-friendly insights with treatment suggestions.",
            },
            {
              inlineData: {
                data: base64Data,
                mimeType: filetype,
              },
            },
          ],
        },
      ],
    });

    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to analyze image.";
  }
};
