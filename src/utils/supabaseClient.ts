import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hfriuxbaqsudyyuywtzr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // your real key here

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

