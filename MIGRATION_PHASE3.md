# Phase 3 Migration: Guest List Management

## Instructions

Before deploying Phase 3 features, you need to execute the following SQL migration in your Supabase database.

### Step 1: Go to Supabase SQL Editor

1. Open your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to "SQL Editor" in the left sidebar
4. Click "New query"

### Step 2: Create the Invites Table

Copy and paste this SQL:

```sql
-- Create invites table
CREATE TABLE invites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  telephone TEXT,
  message_envoye BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX idx_invites_message_envoye ON invites(message_envoye);
```

Click "Run" and wait for confirmation.

### Step 3: Modify RSVP Responses Table

Create a new query and copy/paste:

```sql
-- Add columns to rsvp_responses
ALTER TABLE rsvp_responses 
ADD COLUMN present_status TEXT DEFAULT 'pending' CHECK (present_status IN ('pending', 'present', 'absent')),
ADD COLUMN invite_id UUID REFERENCES invites(id) ON DELETE SET NULL;

-- Create index for performance
CREATE INDEX idx_rsvp_present_status ON rsvp_responses(present_status);
```

Click "Run" and wait for confirmation.

### Step 4: Enable RLS (Row Level Security)

If you haven't already configured RLS for the new tables, you'll need to:

1. Go to "Authentication" → "Policies" in Supabase
2. For the `invites` table, create policies to:
   - Allow authenticated admins to SELECT all rows
   - Allow authenticated admins to INSERT new rows
3. For the `rsvp_responses` table, update policies to:
   - Allow public SELECT
   - Allow public INSERT
   - Allow authenticated admins to UPDATE (for presence tracking)

### Step 5: Install Dependencies Locally

Run in your project terminal:

```bash
npm install
```

This will install `papaparse` and `@types/papaparse` from the updated package.json.

## Features Enabled After Migration

✅ CSV import for guest lists (app/admin/guests)
✅ CSV export for RSVP data (app/admin/dashboard)
✅ Presence tracking (mark guests as present/absent)
✅ Guest list management interface

## Next Steps

1. Execute the SQL migrations above
2. Run `npm install` locally
3. Test in development: `npm run dev`
4. Commit and push to GitHub
5. Vercel will auto-deploy with the new features
