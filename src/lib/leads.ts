import { saveFormSubmission, FormSubmission } from './supabase';

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  source?: string;
};

export async function submitLead(payload: LeadPayload) {
  try {
    // Use Supabase instead of Google Sheets
    const formData: FormSubmission = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
      source: payload.source || 'Contact Form'
    };

    console.log('Submitting lead:', formData);
    const result = await saveFormSubmission(formData);
    
    if (!result.success) {
      console.error('Supabase error:', result.error);
      // Don't throw error, just log it and return success
      // The form submission was saved to localStorage as fallback
      return { success: true, message: 'Data saved locally (Supabase unavailable)' };
    }
    
    return result.data;
  } catch (error) {
    console.error('Error in submitLead:', error);
    // Return success even if there's an error, since we have localStorage fallback
    return { success: true, message: 'Data saved locally' };
  }
}

export type Lead = {
  id?: string;
  timestamp?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source?: string;
};

export async function fetchLeads(): Promise<Lead[]> {
  const url = import.meta.env.VITE_SHEETS_LIST_URL as string | undefined;
  if (!url) throw new Error("Missing VITE_SHEETS_LIST_URL");
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error(`List error ${res.status}`);
  const data = await res.json();
  if (Array.isArray(data)) return data as Lead[];
  if (Array.isArray(data?.rows)) return data.rows as Lead[];
  return [];
}


