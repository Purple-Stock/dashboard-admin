export type StockTransactionType = 'stock_in' | 'stock_out' | 'adjust' | 'move' | 'count';

export interface Item {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  cost: number;
  price: number;
  item_type: string;
  brand: string;
  initial_quantity: number;
  team_id: number;
  created_at: string;
  updated_at: string;
  current_stock: number;
  minimum_stock: number;
  location_id: number | null;
  location_name?: string;
}

export interface Location {
  id: number;
  name: string;
  description: string | null;
  team_id: number;
  created_at: string;
  updated_at: string;
}

export interface StockTransaction {
  id: number;
  item_id: number;
  team_id: number;
  transaction_type: StockTransactionType;
  quantity: number;
  notes: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  source_location_id: number | null;
  destination_location_id: number | null;
}

export interface Team {
  id: number;
  name: string;
  notes: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  user_name?: string;
  members_count?: number;
  items_count?: number;
  locations_count?: number;
}

export interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  teams_count?: number;
  memberships_count?: number;
}

export interface DashboardStats {
  totalItems: number;
  totalLocations: number;
  totalTransactions: number;
  lowStockItems: number;
  totalValue: number;
}
