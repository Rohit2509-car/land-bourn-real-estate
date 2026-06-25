import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client helper
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API: AI-Powered Property Recommendations
app.post("/api/ai/recommend", async (req, res) => {
  const { budget, size, location, category, intent, experience } = req.body;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful fallback when API key is missing
      return res.json({
        isDemo: true,
        text: `### 🌟 Luxury Land AI Investment Summary (Demo Mode)

To unlock the full potential of your **Google AI Studio** integration, please add your **GEMINI_API_KEY** in the **Settings > Secrets** panel!

**Here is an analytical simulation based on your selection:**
- **Proposed Budget:** $${(budget || "1,000,000").toLocaleString()}
- **Target Size:** ${size || "Any"} Acres
- **Desired Location:** ${location || "Premium Regional"}
- **Asset Class:** ${category || "Elite Land"}
- **Investment Intent:** ${intent || "Wealth Preservation"}

#### 📈 Pro-Forma Investment Analysis:
1. **Capital Appreciation Projection:** Historical data for land assets in ${location || "these select regions"} suggests a compound annual growth rate (CAGR) of **8.4% to 11.2%** over the next 5-7 years, propelled by supply constraints of high-tier acreage.
2. **Optimal Tax Allocation:** Given your intent of *${intent || "Strategic Development"}*, we recommend exploring agricultural tax exemptions (conservation easements) or setting up a family trust to optimize long-term wealth transfer.
3. **Zoning & Feasibility Advice:** For any development inside *${location || "coastal or mountain sanctuaries"}*, conduct a Tier-1 environmental site assessment (ESA) to map water tables, soil stability, and setback limits before finalizing architectural drawings.`,
        suggestedCriteria: {
          recommendedCategory: category || "Residential",
          estimatedROI: "9.5% - 12.0%",
          riskProfile: "Low to Moderate",
          recommendedAction: "Arrange private site survey and title deed verification."
        }
      });
    }

    const ai = getAiClient();
    const prompt = `You are an elite, highly sophisticated real estate investment analyst specializing in luxury and high-value land acquisitions for private equity, family offices, and high-net-worth individuals.
Analyze the following buyer profile and generate a comprehensive, visually stunning investment strategy and land recommendation report. Write in elegant, professional, editorial-style markdown.

### Buyer Profile:
- Target Budget: $${(budget || 1000000).toLocaleString()}
- Target Size: ${size || "Any"} Acres
- Preferred Location: ${location || "Any Luxury Region"}
- Asset Category: ${category || "Any"}
- Investment Intent: ${intent || "Development / Legacy Estate / Wealth Preservation"}
- Investor Experience level: ${experience || "Experienced Developer / Institutional"}

Please generate:
1. An elegant, punchy "Executive Investment Summary" outlining why land in ${location || "this region"} fits their goals.
2. A customized "Financial & Capital Growth Analysis" predicting CAGR and asset liquidity.
3. "Zoning, Feasibility & Regulatory Advice" tailored to the ${category || "selected"} land type (e.g. soil testing, easements, utilities, water rights).
4. A customized, strategic "Next Steps" recommendation list.

Return the response in JSON format matching this schema:
{
  "text": "The markdown-formatted strategic report",
  "suggestedCriteria": {
    "recommendedCategory": "The specific sub-genre of land (e.g. Viticulture, Oceanfront Estate, Equestrian)",
    "estimatedROI": "Estimated annual appreciation rate (e.g. 8.5% - 11.0%)",
    "riskProfile": "Low / Moderate / Balanced",
    "recommendedAction": "A specific, immediate action (e.g. Schedule soil core drills, Procure land surveyor)"
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text ? response.text.trim() : "";
    const parsedData = JSON.parse(resultText);
    res.json(parsedData);
  } catch (error: any) {
    console.error("AI Recommendation Error:", error);
    res.status(500).json({ error: error.message || "Failed to process AI recommendation" });
  }
});

// API: AI-Powered Smart Inquiry Analyzer
app.post("/api/ai/analyze-inquiry", async (req, res) => {
  const { propertyId, propertyTitle, location, price, buyerName, message } = req.body;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        isDemo: true,
        analysis: `### 🛡️ Smart Lead Analysis (Demo Mode)
Configure your **GEMINI_API_KEY** under Secrets to activate live broker assistant analysis.

**Simulation for Lead: ${buyerName || "Investor"}**
- **Inquiry Sentiment:** High interest, commercial purchase orientation.
- **Negotiation Strategy:** Position this parcel as a limited-supply premium holding. Offer standard site inspection, geological survey reports, and title guarantee covenants.
- **Estimated Conversion Probability:** **85%** based on direct property-specific intent.`
      });
    }

    const ai = getAiClient();
    const prompt = `You are a world-class luxury real estate broker's assistant.
An inquiry has been submitted for a premium land asset. Analyze the lead details below and generate a private internal broker advisory note in elegant Markdown to help the broker negotiate, build trust, and close the transaction.

### Property Details:
- ID: ${propertyId}
- Title: ${propertyTitle}
- Location: ${location}
- Listing Price: $${(price || 0).toLocaleString()}

### Lead Details:
- Buyer Name: ${buyerName}
- Buyer Message: "${message}"

Generate a short advisory note including:
1. **Sentiment & Motivation Analysis**: Assess the seriousness, urgency, and underlying motivations of this buyer.
2. **Tailored Negotiation Angle**: Suggest specific talking points (e.g., highlighting specific zoning potentials, rare water rights, or parcel divisibility).
3. **Closing Strategy**: Recommended direct prompt or proposal to secure an in-person viewing or earnest money deposit.

Format your response in beautiful, neat Markdown. Return JSON matching:
{
  "analysis": "The markdown advisory note text"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text ? response.text.trim() : "";
    const parsedData = JSON.parse(resultText);
    res.json(parsedData);
  } catch (error: any) {
    console.error("AI Inquiry Analyzer Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze inquiry" });
  }
});

// Serve static assets or boot Vite Dev Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Luxury Land Server running on port ${PORT}`);
  });
}

startServer();
