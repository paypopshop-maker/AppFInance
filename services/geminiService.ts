import { GoogleGenAI, Type } from "@google/genai";
import { ParsedTransaction } from '../types';

// Fix: Property 'env' does not exist on type 'ImportMeta'.
// As per coding guidelines, the API key must be obtained exclusively from `process.env.API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const schema = {
  type: Type.OBJECT,
  properties: {
    amount: { type: Type.NUMBER, description: "مبلغ تراکنش به صورت یک عدد خالص به ریال. هرگونه جداکننده هزارگان (٬) یا واحد پولی باید حذف شود." },
    type: { type: Type.STRING, enum: ['income', 'expense'], description: "نوع تراکنش. باید 'income' برای واریز یا 'expense' برای برداشت و خرید باشد." },
    bank: { type: Type.STRING, description: "نام بانک در صورت ذکر شدن." },
    date: { type: Type.STRING, description: "تاریخ تراکنش در فرمت YYYY/MM/DD بر اساس تقویم شمسی." },
    time: { type: Type.STRING, description: "زمان تراکنش در فرمت HH:MM." },
  },
  required: ["amount", "type"],
};

export const parseBankSms = async (smsText: string): Promise<ParsedTransaction> => {
    try {
        const prompt = `با دقت جزئیات تراکنش را از پیامک بانکی فارسی زیر استخراج کن. مبلغ را به صورت یک عدد خالص (به ریال) برگردان. نوع تراکنش را به عنوان 'income' (واریز) یا 'expense' (برداشت/خرید) مشخص کن. نام بانک، تاریخ و زمان را در صورت وجود استخراج کن: "${smsText}"`

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);

        // Basic validation
        if (typeof parsedData.amount !== 'number' || !['income', 'expense'].includes(parsedData.type)) {
            throw new Error("پاسخ دریافتی از API معتبر نیست.");
        }

        return parsedData as ParsedTransaction;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("خطا در ارتباط با سرویس هوش مصنوعی.");
    }
};
