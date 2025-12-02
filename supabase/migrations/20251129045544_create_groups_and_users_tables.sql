/*
  # Create groups sharing platform tables

  1. New Tables
    - `groups` - Main group/pool data
      - `id` (uuid, primary key)
      - `creator_id` (uuid, foreign key to auth.users)
      - `name` (text, group name)
      - `description` (text, optional)
      - `total_goal` (numeric, target contribution amount)
      - `cost_per_person` (numeric, cost per slot)
      - `total_slots` (integer, number of available slots)
      - `filled_slots` (integer, current filled slots)
      - `total_raised` (numeric, current amount raised)
      - `deadline` (timestamptz, contribution deadline)
      - `is_flexible` (boolean, whether deadline is flexible)
      - `status` (text, 'active', 'closed', 'completed')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `group_members` - Members and their contributions
      - `id` (uuid, primary key)
      - `group_id` (uuid, foreign key to groups)
      - `user_id` (uuid, foreign key to auth.users)
      - `slots_count` (integer, number of slots they're contributing to)
      - `total_contribution` (numeric, total amount paid)
      - `payment_method` (text, 'apple_pay', 'paystack')
      - `status` (text, 'pending', 'paid', 'completed')
      - `joined_at` (timestamptz)

    - `group_items` - Items being pooled for
      - `id` (uuid, primary key)
      - `group_id` (uuid, foreign key to groups)
      - `name` (text, item name)
      - `unit_cost` (numeric, cost per unit)
      - `quantity` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Restrict access to own data and group memberships

  3. Indexes
    - Index on groups(creator_id)
    - Index on group_members(user_id)
    - Index on group_members(group_id)
*/

CREATE TABLE IF NOT EXISTS groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  total_goal numeric NOT NULL DEFAULT 0,
  cost_per_person numeric NOT NULL DEFAULT 0,
  total_slots integer NOT NULL DEFAULT 0,
  filled_slots integer NOT NULL DEFAULT 0,
  total_raised numeric NOT NULL DEFAULT 0,
  deadline timestamptz,
  is_flexible boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'completed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slots_count integer NOT NULL DEFAULT 1,
  total_contribution numeric NOT NULL DEFAULT 0,
  payment_method text CHECK (payment_method IN ('apple_pay', 'paystack')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'completed')),
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

CREATE TABLE IF NOT EXISTS group_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  name text NOT NULL,
  unit_cost numeric NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Groups are viewable by all authenticated users"
  ON groups FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create groups"
  ON groups FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Group creators can update their groups"
  ON groups FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id)
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Group members can view group members"
  ON group_members FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM group_members gm
      WHERE gm.group_id = group_members.group_id
      AND gm.user_id = auth.uid()
    )
    OR
    (SELECT creator_id FROM groups WHERE id = group_members.group_id) = auth.uid()
  );

CREATE POLICY "Users can join groups"
  ON group_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their membership"
  ON group_members FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Group items viewable by members"
  ON group_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM group_members gm
      WHERE gm.group_id = group_items.group_id
      AND gm.user_id = auth.uid()
    )
    OR
    (SELECT creator_id FROM groups WHERE id = group_items.group_id) = auth.uid()
  );

CREATE POLICY "Group creators can manage items"
  ON group_items FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT creator_id FROM groups WHERE id = group_items.group_id) = auth.uid()
  );

CREATE INDEX idx_groups_creator_id ON groups(creator_id);
CREATE INDEX idx_group_members_user_id ON group_members(user_id);
CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_group_items_group_id ON group_items(group_id);
