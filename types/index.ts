export interface Group {
  id: string;
  creator_id: string;
  name: string;
  description?: string;
  total_goal: number;
  cost_per_person: number;
  total_slots: number;
  filled_slots: number;
  total_raised: number;
  deadline?: string;
  is_flexible: boolean;
  status: 'active' | 'closed' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  slots_count: number;
  total_contribution: number;
  payment_method?: 'apple_pay' | 'paystack';
  status: 'pending' | 'paid' | 'completed';
  joined_at: string;
}

export interface GroupItem {
  id: string;
  group_id: string;
  name: string;
  unit_cost: number;
  quantity: number;
  created_at: string;
}

export interface CreateGroupFormData {
  groupName: string;
  itemType: 'cow' | 'item';
  itemName: string;
  itemCost: number;
  numberOfPeople: number;
  deadline: Date;
  isFlexible: boolean;
  slots: number;
}

export interface PaymentMethod {
  id: 'apple_pay' | 'paystack';
  label: string;
  icon: string;
}
