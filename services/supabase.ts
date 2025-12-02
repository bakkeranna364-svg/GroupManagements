import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseService = {
  async createGroup(groupData: any) {
    return supabase.from('groups').insert([groupData]).select().single();
  },

  async getGroup(id: string) {
    return supabase.from('groups').select('*').eq('id', id).single();
  },

  async getGroups() {
    return supabase.from('groups').select('*').order('created_at', { ascending: false });
  },

  async joinGroup(groupId: string, userId: string, slotsCount: number) {
    return supabase.from('group_members').insert([
      {
        group_id: groupId,
        user_id: userId,
        slots_count: slotsCount,
      },
    ]).select().single();
  },

  async getGroupMembers(groupId: string) {
    return supabase.from('group_members').select('*').eq('group_id', groupId);
  },

  async updateGroupMember(memberId: string, data: any) {
    return supabase.from('group_members').update(data).eq('id', memberId).select().single();
  },

  async addGroupItem(groupId: string, itemData: any) {
    return supabase.from('group_items').insert([
      {
        group_id: groupId,
        ...itemData,
      },
    ]).select().single();
  },

  async getGroupItems(groupId: string) {
    return supabase.from('group_items').select('*').eq('group_id', groupId);
  },
};
