import { QuizAnswers } from "../types";

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Type for API Response
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Validates the email format specifically
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates the phone format (basic check)
 */
const isValidPhone = (phone: string): boolean => {
  return phone.length >= 10;
};

/**
 * SIMULATED SERVERLESS FUNCTION (Next.js Route Handler Logic)
 * 
 * In a real Next.js app, this would be: /app/api/leads/route.ts
 * handling a POST request and writing to Supabase.
 */
export const submitLead = async (data: QuizAnswers): Promise<ApiResponse> => {
  console.log("🚀 [Server Simulation] Validating payload...");
  
  await delay(1500); // Simulate network latency

  // --- Validation Logic (Simulating Zod) ---
  const errors: string[] = [];
  
  if (!data.name || data.name.length < 3) errors.push("Nome muito curto");
  if (!isValidEmail(data.email)) errors.push("Email inválido");
  if (!isValidPhone(data.phone)) errors.push("Telefone inválido");
  
  if (data.transactionType === '') errors.push("Tipo de transação obrigatório");

  if (errors.length > 0) {
    console.error("❌ [Server Simulation] Validation Failed:", errors);
    return {
      success: false,
      message: "Por favor, verifique os campos de contato."
    };
  }

  // --- Database Simulation (Supabase) ---
  const supabasePayload = {
    created_at: new Date().toISOString(),
    details: {
        type: data.transactionType,
        property: data.propertyType,
        budget: data.budget,
        locations: data.neighborhoods
    },
    contact: {
        name: data.name,
        email: data.email,
        phone: data.phone
    },
    status: 'NEW_LEAD'
  };

  console.log("✅ [Server Simulation] Data Validated.");
  console.log("📡 [Server Simulation] Writing to Supabase:", JSON.stringify(supabasePayload, null, 2));

  return {
    success: true,
    message: "Perfil recebido com sucesso!"
  };
};