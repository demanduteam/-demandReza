import { createClient } from '@supabase/supabase-js';

// Credentials provided in the source files
const SUPABASE_URL = 'https://byomcvqnuhpeazicirjg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5b21jdnFudWhwZWF6aWNpcmpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MjMxNzMsImV4cCI6MjA4MjI5OTE3M30.Bl5sahKsZ4nX0iiPT9tKmXm_Pq3bfAjLLiVYeS3oA2g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);