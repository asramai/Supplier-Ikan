-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
-- Note: Do NOT set app.jwt_secret in Supabase managed databases.
-- Auth/JWT is handled by Supabase platform automatically.

-- ============================================
-- PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'Investor',
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  avatar TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  permissions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- COMPANY IDENTITY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.company_identity (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT 'PT Asy-Syifa Panua',
  address TEXT NOT NULL DEFAULT 'Jl. Pelabuhan Panua, Sulawesi Tenggara',
  phone TEXT NOT NULL DEFAULT '+62 812 3456 7890',
  email TEXT NOT NULL DEFAULT 'info@asysyifapanua.com',
  npwp TEXT NOT NULL DEFAULT '12.345.678.9-012.000',
  logo TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- MITRA (PARTNERS) TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.mitra (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('nelayan', 'vendor')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Tidak Aktif')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(type, name)
);

-- ============================================
-- FISH TYPES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.fish_types (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- INVENTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.inventory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  fish_type_id UUID REFERENCES public.fish_types(id) ON DELETE CASCADE,
  quantity_kg NUMERIC NOT NULL DEFAULT 0,
  price_per_kg NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TRANSACTIONS TABLE (Pembelian & Penjualan)
-- ============================================
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('beli', 'jual')),
  invoice_number TEXT NOT NULL UNIQUE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  partner_name TEXT NOT NULL,
  partner_type TEXT NOT NULL CHECK (partner_type IN ('nelayan', 'vendor')),
  total_amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Selesai' CHECK (status IN ('Selesai', 'Pending', 'Dibatalkan')),
  notes TEXT NOT NULL DEFAULT '',
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TRANSACTION ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.transaction_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  transaction_id UUID REFERENCES public.transactions(id) ON DELETE CASCADE,
  fish_type TEXT NOT NULL,
  quantity_kg NUMERIC NOT NULL DEFAULT 0,
  price_per_kg NUMERIC NOT NULL DEFAULT 0,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- INVESTORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.investors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  avatar TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(email)
);

-- ============================================
-- INVESTOR TRANSACTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.investor_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  investor_id UUID REFERENCES public.investors(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('masuk', 'keluar')),
  amount NUMERIC NOT NULL DEFAULT 0,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- INVOICE COUNTERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.invoice_counters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  year INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('beli', 'jual')),
  last_number INTEGER NOT NULL DEFAULT 0,
  UNIQUE(year, type)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON public.transactions(date);
CREATE INDEX IF NOT EXISTS idx_transactions_partner ON public.transactions(partner_name);
CREATE INDEX IF NOT EXISTS idx_transaction_items_transaction_id ON public.transaction_items(transaction_id);
CREATE INDEX IF NOT EXISTS idx_inventory_fish_type_id ON public.inventory(fish_type_id);
CREATE INDEX IF NOT EXISTS idx_investor_transactions_investor_id ON public.investor_transactions(investor_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
-- Note: RLS is disabled because this app uses localStorage-based auth,
-- not Supabase Auth. All operations are allowed for anon/authenticated roles.
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

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing updated_at triggers if they exist
DROP TRIGGER IF EXISTS set_updated_at_profiles ON public.profiles;
DROP TRIGGER IF EXISTS set_updated_at_company_identity ON public.company_identity;
DROP TRIGGER IF EXISTS set_updated_at_mitra ON public.mitra;
DROP TRIGGER IF EXISTS set_updated_at_inventory ON public.inventory;
DROP TRIGGER IF EXISTS set_updated_at_transactions ON public.transactions;
DROP TRIGGER IF EXISTS set_updated_at_investors ON public.investors;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_company_identity BEFORE UPDATE ON public.company_identity FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_mitra BEFORE UPDATE ON public.mitra FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_inventory BEFORE UPDATE ON public.inventory FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_transactions BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_investors BEFORE UPDATE ON public.investors FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- STORAGE BUCKET FOR LOGOS/AVATARS (optional)
-- ============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'assets',
  'assets',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "Allow public read assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated upload assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete assets" ON storage.objects;

CREATE POLICY "Allow public read assets" ON storage.objects FOR SELECT USING (bucket_id = 'assets');
CREATE POLICY "Allow authenticated upload assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'assets' AND auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update assets" ON storage.objects FOR UPDATE USING (bucket_id = 'assets' AND auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete assets" ON storage.objects FOR DELETE USING (bucket_id = 'assets' AND auth.role() = 'authenticated');
