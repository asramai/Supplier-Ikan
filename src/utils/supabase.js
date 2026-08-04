import { createClient } from '@supabase/supabase-js'

const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://zprhkpmtimynsvhyjagc.supabase.co'
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwcmhrcG10aW15bnN2aHlqYWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3Mzk5MTMsImV4cCI6MjEwMTMxNTkxM30.m4JZVOQdbiQ7e-FOOepl3LCnp9jmZufeKJvc3aHBoqE'

export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
