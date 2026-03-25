-- 1. ENUM Types
CREATE TYPE public_status_enum AS ENUM ('Draft', 'Review', 'Public', 'Hidden', 'Archived');

-- 2. Profiles Table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    profile_type TEXT NOT NULL,
    short_summary TEXT NOT NULL,
    bio TEXT NOT NULL,
    profile_image_url TEXT NOT NULL,
    authority_highlight_1 TEXT,
    authority_highlight_2 TEXT,
    authority_highlight_3 TEXT,
    authority_highlight_4 TEXT,
    core_principle_1 TEXT,
    core_principle_2 TEXT,
    core_principle_3 TEXT,
    core_principle_4 TEXT,
    is_default_author BOOLEAN DEFAULT false,
    is_default_reviewer BOOLEAN DEFAULT false,
    canonical_slug TEXT UNIQUE NOT NULL,
    public_status public_status_enum NOT NULL DEFAULT 'Draft',
    meta_title_override TEXT,
    meta_description_override TEXT,
    og_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Answer Cards Table
CREATE TABLE answer_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    policy_domain TEXT NOT NULL,
    user_query TEXT NOT NULL,
    snippet TEXT NOT NULL,
    action_plan_1_title TEXT,
    action_plan_1_body TEXT,
    action_plan_2_title TEXT,
    action_plan_2_body TEXT,
    action_plan_3_title TEXT,
    action_plan_3_body TEXT,
    context_impact TEXT NOT NULL,
    evidence_1_title TEXT,
    evidence_1_url TEXT,
    evidence_2_title TEXT,
    evidence_2_url TEXT,
    evidence_3_title TEXT,
    evidence_3_url TEXT,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    featured_on_home BOOLEAN DEFAULT false,
    display_priority INT DEFAULT 0,
    canonical_slug TEXT UNIQUE NOT NULL,
    public_status public_status_enum NOT NULL DEFAULT 'Draft',
    meta_title_override TEXT,
    meta_description_override TEXT,
    og_image_url TEXT,
    schema_override TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Issue Briefings Table
CREATE TABLE issue_briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    body TEXT NOT NULL,
    primary_source_title TEXT NOT NULL,
    primary_source_url TEXT NOT NULL,
    publisher TEXT NOT NULL,
    source_published_date TIMESTAMPTZ NOT NULL,
    coverage_type TEXT,
    issue_topic TEXT NOT NULL,
    key_takeaway_1 TEXT,
    key_takeaway_2 TEXT,
    key_takeaway_3 TEXT,
    additional_source_1_title TEXT,
    additional_source_1_url TEXT,
    additional_source_2_title TEXT,
    additional_source_2_url TEXT,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    featured_on_home BOOLEAN DEFAULT false,
    display_priority INT DEFAULT 0,
    canonical_slug TEXT UNIQUE NOT NULL,
    public_status public_status_enum NOT NULL DEFAULT 'Draft',
    meta_title_override TEXT,
    meta_description_override TEXT,
    og_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Fact Check Items Table
CREATE TABLE fact_check_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_title TEXT NOT NULL,
    claim_summary TEXT NOT NULL,
    verdict TEXT NOT NULL,
    fact_check_body TEXT NOT NULL,
    evidence_1_title TEXT,
    evidence_1_url TEXT,
    evidence_2_title TEXT,
    evidence_2_url TEXT,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    featured_on_home BOOLEAN DEFAULT false,
    public_status public_status_enum NOT NULL DEFAULT 'Draft',
    meta_title_override TEXT,
    meta_description_override TEXT,
    og_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Mapping Tables (N:M Relationships)
CREATE TABLE profile_related_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    card_id UUID REFERENCES answer_cards(id) ON DELETE CASCADE,
    UNIQUE(profile_id, card_id)
);

CREATE TABLE profile_related_briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    briefing_id UUID REFERENCES issue_briefings(id) ON DELETE CASCADE,
    UNIQUE(profile_id, briefing_id)
);

CREATE TABLE related_answer_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_card_id UUID REFERENCES answer_cards(id) ON DELETE CASCADE,
    target_card_id UUID REFERENCES answer_cards(id) ON DELETE CASCADE,
    UNIQUE(source_card_id, target_card_id)
);

CREATE TABLE answer_card_briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id UUID REFERENCES answer_cards(id) ON DELETE CASCADE,
    briefing_id UUID REFERENCES issue_briefings(id) ON DELETE CASCADE,
    UNIQUE(card_id, briefing_id)
);

CREATE TABLE related_issue_briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_briefing_id UUID REFERENCES issue_briefings(id) ON DELETE CASCADE,
    target_briefing_id UUID REFERENCES issue_briefings(id) ON DELETE CASCADE,
    UNIQUE(source_briefing_id, target_briefing_id)
);

CREATE TABLE fact_check_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fact_check_id UUID REFERENCES fact_check_items(id) ON DELETE CASCADE,
    card_id UUID REFERENCES answer_cards(id) ON DELETE CASCADE,
    UNIQUE(fact_check_id, card_id)
);

CREATE TABLE fact_check_briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fact_check_id UUID REFERENCES fact_check_items(id) ON DELETE CASCADE,
    briefing_id UUID REFERENCES issue_briefings(id) ON DELETE CASCADE,
    UNIQUE(fact_check_id, briefing_id)
);

-- 7. Tags System
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE answer_card_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id UUID REFERENCES answer_cards(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(card_id, tag_id)
);

-- 8. Row Level Security Policies
-- Enable RLS for all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE answer_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE issue_briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE fact_check_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_related_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_related_briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE related_answer_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE answer_card_briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE related_issue_briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE fact_check_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE fact_check_briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE answer_card_tags ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all tables
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Public answer_cards are viewable by everyone." ON answer_cards FOR SELECT USING (true);
CREATE POLICY "Public issue_briefings are viewable by everyone." ON issue_briefings FOR SELECT USING (true);
CREATE POLICY "Public fact_check_items are viewable by everyone." ON fact_check_items FOR SELECT USING (true);
CREATE POLICY "Mappings are viewable by everyone." ON profile_related_cards FOR SELECT USING (true);
CREATE POLICY "Mappings are viewable by everyone." ON profile_related_briefings FOR SELECT USING (true);
CREATE POLICY "Mappings are viewable by everyone." ON related_answer_cards FOR SELECT USING (true);
CREATE POLICY "Mappings are viewable by everyone." ON answer_card_briefings FOR SELECT USING (true);
CREATE POLICY "Mappings are viewable by everyone." ON related_issue_briefings FOR SELECT USING (true);
CREATE POLICY "Mappings are viewable by everyone." ON fact_check_cards FOR SELECT USING (true);
CREATE POLICY "Mappings are viewable by everyone." ON fact_check_briefings FOR SELECT USING (true);
CREATE POLICY "Tags are viewable by everyone." ON tags FOR SELECT USING (true);
CREATE POLICY "Mappings are viewable by everyone." ON answer_card_tags FOR SELECT USING (true);

-- Allow authenticated users (Admins) to INSERT/UPDATE/DELETE (Requires proper admin claims in production)
-- Simplification: Just allow authenticated role.
CREATE POLICY "Authenticated users can insert profiles" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update profiles" ON profiles FOR UPDATE TO authenticated USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete profiles" ON profiles FOR DELETE TO authenticated USING (auth.role() = 'authenticated');

-- Doing the same block-policy structure for others would be very verbose.
-- This script relies on standard authenticated constraints. 
-- In real production setup, one would wrap `auth.jwt() ->> 'is_admin'` check.
-- Applying shortcut "ALL" policy for authenticated admins to mutation tables:

DO $$
DECLARE
    t_name text;
BEGIN
    FOR t_name IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('CREATE POLICY "Admins can mutate %I" ON %I FOR ALL TO authenticated USING (auth.role() = ''authenticated'') WITH CHECK (auth.role() = ''authenticated'');', t_name, t_name);
    END LOOP;
END;
$$;
