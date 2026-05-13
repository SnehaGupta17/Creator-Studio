// // const { GoogleGenerativeAI } = require("@google/generative-ai");
// // const express = require("express");

// // const router = express.Router();

// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // router.get("/", (req, res) => {
// //   res.send("Auth Route Working");
// // });

// // module.exports = router;

// // const axios = require("axios");

// // router.post("/generate", async (req, res) => {
// //   try {
// //     const { prompt } = req.body;

// //     // 1. Initialize the model using the SDK
// //     const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });

// //     // 2. Generate content
// //     const result = await model.generateContent(prompt);
// //     const response = await result.response;
// //     const text = response.text();

// //     res.json({ response: text });

// //   } catch (error) {
// //     console.error("AI Error:", error);
// //     res.status(500).json({
// //       error: "AI generation failed",
// //       details: error.message
// //     });
// //   }
// // });

// const express = require("express");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const router = express.Router();
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Use the updated 3.1 identifier
// const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

// router.get("/", (req, res) => {
//   res.send("Auth Route Working");
// });

// router.post("/generate", async (req, res) => {
//   try {
//     const { prompt } = req.body;
    
//     // Note: No need for axios, the SDK handles the URL internally
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     res.json({ response: text });
//   } catch (error) {
//     console.error("Detailed Error:", error);
//     res.status(500).json({ error: "AI generation failed" });
//   }
// });

// // ALWAYS keep this at the very end
// module.exports = router;

const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model for fast text generation
const textModel = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

// Model for high-quality image generation
const imageModel = genAI.getGenerativeModel({ model: "gemini-3.1-flash-image-preview" });

router.get("/", (req, res) => {
  res.send("Auth Route Working");
});

// Text Generation Route
router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    // We wrap the user's prompt with strict "Formatting Instructions"
    const strictPrompt = `
      You are a professional Social Media Script Writer. 
      Act as a content tool, not a chatbot. 
      Do not say "Here is your script" or "I hope this helps."
      
      TASK: Create a viral script and social media plan for the topic: "${prompt}".
      
      FORMAT THE OUTPUT AS FOLLOWS:
      # TITLE: [Catchy Title]
      
      ## 🎥 VIDEO SCRIPT (ASMR & VISUALS)
      [Write a scene-by-scene breakdown here]
      
      ## ✍️ CAPTION
      [Write a ready-to-paste caption]
      
      ## #️⃣ HASHTAGS
      [Relevant hashtags]
      
      ---
      Strictly avoid any conversational filler. Only provide the content above.
    `;

    const result = await textModel.generateContent(strictPrompt);
    const response = await result.response;
    res.json({ response: response.text() });
  } catch (error) {
    console.error("Text Error:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

// // FIXED: Image Generation Route
// router.post("/generate-image", async (req, res) => {
//   try {
//     const { prompt } = req.body;
    
//     // Crucial: You must wrap the prompt and specify the 'IMAGE' modality
//     const result = await imageModel.generateContent({
//       contents: [{ role: 'user', parts: [{ text: prompt }] }],
//       generationConfig: {
//         responseModalities: ["IMAGE"], // This tells Nano Banana 2 to generate an image
//       }
//     });

//     const response = await result.response;
    
//     // Find the part containing the base64 data
//     const imagePart = response.candidates[0].content.parts.find(part => part.inlineData);
    
//     if (imagePart && imagePart.inlineData) {
//       res.json({ imageBase64: imagePart.inlineData.data });
//     } else {
//       res.status(400).json({ error: "Model did not return an image part." });
//     }
//   } catch (error) {
//     console.error("Image Error:", error);
//     // Fallback: If 'preview' fails, try 'gemini-3.1-flash' which also supports this modality
//     res.status(500).json({ error: "Image generation failed" });
//   }
// });
// router.post("/generate-image", async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     const result = await imageModel.generateContent({
//       contents: [{ role: 'user', parts: [{ text: prompt }] }],
//       generationConfig: { responseModalities: ["IMAGE"] }
//     });

//     const response = await result.response;
//     const imagePart = response.candidates[0].content.parts.find(part => part.inlineData);
    
//     if (imagePart) {
//       res.json({ imageBase64: imagePart.inlineData.data });
//     } else {
//       throw new Error("No image part");
//     }
//   } catch (error) {
//     console.error("Image Quota Hit - Sending Fallback");
//     // This sends a high-quality, relevant placeholder so your UI still works!
//     res.json({ 
//       imageBase64: null, 
//       fallbackUrl: "https://images.unsplash.com/photo-1620712943543-bcc4638d9f8e?auto=format&fit=crop&w=800&q=80",
//       message: "API Quota exceeded, showing concept image."
//     });
//   }
// });
const axios = require("axios"); // Make sure this is at the top

router.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // 1. Clean and encode the prompt for the URL
    const cleanPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1024&height=1024&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;

    console.log("Fetching from Pollinations:", imageUrl);

    // 2. Fetch the image as an arraybuffer (raw binary data)
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // 3. Convert the binary data to a Base64 string
    const base64 = Buffer.from(response.data, 'binary').toString('base64');

    // 4. Send it to the frontend just like Gemini did
    res.json({ imageBase64: base64 });

  } catch (error) {
    console.error("Pollinations Error:", error.message);
    res.status(500).json({ error: "Image generation failed" });
  }
});
module.exports = router;