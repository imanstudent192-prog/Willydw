// Supabase configuration and functions
import { createClient } from '@supabase/supabase-js'

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gepfkhlfwqcmdedaltexek.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlcGZraGxmd3FjbWVkYWx0eGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2OTA3MTgsImV4cCI6MjA3NjI2NjcxOH0.8fWm3qS60phQUVdFDYz54z7o2WrEShJDjikSUKjjST0'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Form submission types
export interface FormSubmission {
  id?: string
  name: string
  email: string
  phone: string
  message: string
  source: string
  created_at?: string
}

// Save form submission to Supabase
export async function saveFormSubmission(formData: FormSubmission) {
  try {
    console.log('Attempting to save to Supabase:', formData);
    console.log('Supabase URL:', supabaseUrl);
    
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([formData])
      .select()

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Successfully saved to Supabase:', data);
    return { success: true, data }
  } catch (error: any) {
    console.error('Error saving form submission:', error);
    
    // Fallback: Save to localStorage as backup
    try {
      const existingData = JSON.parse(localStorage.getItem('form_submissions') || '[]');
      const newSubmission = {
        ...formData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        saved_locally: true
      };
      existingData.push(newSubmission);
      localStorage.setItem('form_submissions', JSON.stringify(existingData));
      console.log('Saved to localStorage as fallback:', newSubmission);
    } catch (localError) {
      console.error('Failed to save to localStorage:', localError);
    }
    
    return { success: false, error: error.message || 'Network error' }
  }
}

// Get all form submissions
export async function getFormSubmissions() {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching form submissions:', error)
    return { success: false, error: error.message }
  }
}

// SQL to create the form_submissions table in Supabase:
/*
CREATE TABLE form_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  source VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/