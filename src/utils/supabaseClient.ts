import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hfriuxbaqsudyyuywtzr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmcml1eGJhcXN1ZHl5dXl3dHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMTExMjUsImV4cCI6MjA1OTg4NzEyNX0.ASXKapjD2b4tSf1z6qlzXxnx5htF8I5yHRuVMtEujRw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

