-- Fix RLS: allow all operations for anon/authenticated roles
-- Run this in Supabase SQL Editor after the main schema

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Allow authenticated read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow admin update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow authenticated read transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow authenticated insert transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow authenticated update transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow authenticated delete transactions" ON public.transactions;
DROP POLICY IF EXISTS "Allow authenticated read transaction_items" ON public.transaction_items;
DROP POLICY IF EXISTS "Allow authenticated insert transaction_items" ON public.transaction_items;
DROP POLICY IF EXISTS "Allow authenticated update transaction_items" ON public.transaction_items;
DROP POLICY IF EXISTS "Allow authenticated delete transaction_items" ON public.transaction_items;
DROP POLICY IF EXISTS "Allow authenticated read mitra" ON public.mitra;
DROP POLICY IF EXISTS "Allow authenticated insert mitra" ON public.mitra;
DROP POLICY IF EXISTS "Allow authenticated update mitra" ON public.mitra;
DROP POLICY IF EXISTS "Allow authenticated delete mitra" ON public.mitra;
DROP POLICY IF EXISTS "Allow authenticated read fish_types" ON public.fish_types;
DROP POLICY IF EXISTS "Allow authenticated insert fish_types" ON public.fish_types;
DROP POLICY IF EXISTS "Allow authenticated update fish_types" ON public.fish_types;
DROP POLICY IF EXISTS "Allow authenticated delete fish_types" ON public.fish_types;
DROP POLICY IF EXISTS "Allow authenticated read inventory" ON public.inventory;
DROP POLICY IF EXISTS "Allow authenticated insert inventory" ON public.inventory;
DROP POLICY IF EXISTS "Allow authenticated update inventory" ON public.inventory;
DROP POLICY IF EXISTS "Allow authenticated delete inventory" ON public.inventory;
DROP POLICY IF EXISTS "Allow authenticated read investors" ON public.investors;
DROP POLICY IF EXISTS "Allow authenticated insert investors" ON public.investors;
DROP POLICY IF EXISTS "Allow authenticated update investors" ON public.investors;
DROP POLICY IF EXISTS "Allow authenticated delete investors" ON public.investors;
DROP POLICY IF EXISTS "Allow authenticated read investor_transactions" ON public.investor_transactions;
DROP POLICY IF EXISTS "Allow authenticated insert investor_transactions" ON public.investor_transactions;
DROP POLICY IF EXISTS "Allow authenticated update investor_transactions" ON public.investor_transactions;
DROP POLICY IF EXISTS "Allow authenticated delete investor_transactions" ON public.investor_transactions;
DROP POLICY IF EXISTS "Allow authenticated read company_identity" ON public.company_identity;
DROP POLICY IF EXISTS "Allow authenticated insert company_identity" ON public.company_identity;
DROP POLICY IF EXISTS "Allow authenticated update company_identity" ON public.company_identity;
DROP POLICY IF EXISTS "Allow authenticated read invoice_counters" ON public.invoice_counters;
DROP POLICY IF EXISTS "Allow authenticated insert invoice_counters" ON public.invoice_counters;
DROP POLICY IF EXISTS "Allow authenticated update invoice_counters" ON public.invoice_counters;

-- Disable RLS on all tables
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_identity DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mitra DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.fish_types DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.investors DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_counters DISABLE ROW LEVEL SECURITY;
