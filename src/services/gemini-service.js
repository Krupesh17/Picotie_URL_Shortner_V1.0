import { GoogleGenAI, Type } from "@google/genai";

if (!import.meta.env.VITE_GEMINI_API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const PERSON_DETECTION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    person_count: {
      type: Type.INTEGER,
      description: "Total number of people detected in the image.",
    },
    bounding_box: {
      type: Type.OBJECT,
      description:
        "Bounding box of the most prominent person. This will be null if no person is found.",
      nullable: true,
      properties: {
        x: {
          type: Type.NUMBER,
          description: "Normalized top-left x-coordinate (from 0 to 1).",
        },
        y: {
          type: Type.NUMBER,
          description: "Normalized top-left y-coordinate (from 0 to 1).",
        },
        width: {
          type: Type.NUMBER,
          description: "Normalized width of the box (from 0 to 1).",
        },
        height: {
          type: Type.NUMBER,
          description: "Normalized height of the box (from 0 to 1).",
        },
      },
      required: ["x", "y", "width", "height"],
    },
  },
  required: ["person_count", "bounding_box"],
};

function dataUrlToInlineData(dataUrl) {
  const [header, data] = dataUrl.split(",");
  const mimeType = header.match(/:(.*?);/)?.[1];
  if (!mimeType || !data) {
    throw new Error("Invalid data URL format");
  }
  return {
    inlineData: {
      mimeType,
      data,
    },
  };
}

export async function cropToPerson(base64Image) {
  const imagePart = dataUrlToInlineData(base64Image);
  
  const prompt = `Analyze the image to detect people. Your response must be a JSON object that strictly adheres to the provided schema.
- If one person is found, set person_count to 1 and provide their bounding_box.
- If multiple people are found, set person_count to the number of people found, and set bounding_box to null.
- If no people are found, set person_count to 0 and set bounding_box to null.
The bounding box coordinates must be normalized from 0 to 1.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      parts: [imagePart, { text: prompt }],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: PERSON_DETECTION_SCHEMA,
    },
  });

  const jsonText = response.text.trim();
  let result;

  try {
    result = JSON.parse(jsonText);
  } catch (e) {
    console.error("Failed to parse Gemini response:", jsonText);
    throw new Error("The AI returned an invalid response. Please try again.");
  }

  if (result.person_count > 1) {
    throw new Error(
      "Multiple people detected. Please upload a photo with only one person."
    );
  }

  if (result.person_count === 0 || !result.bounding_box) {
    throw new Error(
      "No person was found in the photo. Please try another one."
    );
  }

  return result.bounding_box;
}
