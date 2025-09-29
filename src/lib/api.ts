import db from './db';
import { Item, Location, StockTransaction, DashboardStats, User, Team } from '@/types/database';

export async function getDashboardStats(): Promise<DashboardStats> {
  const client = await db.connect();
  try {
    const [itemsResult, locationsResult, transactionsResult, lowStockResult, valueResult] = await Promise.all([
      client.query('SELECT COUNT(*) as count FROM items'),
      client.query('SELECT COUNT(*) as count FROM locations'),
      client.query('SELECT COUNT(*) as count FROM stock_transactions'),
      client.query('SELECT COUNT(*) as count FROM items WHERE current_stock <= minimum_stock'),
      client.query('SELECT SUM(current_stock * cost) as total FROM items WHERE current_stock > 0')
    ]);

    return {
      totalItems: parseInt(itemsResult.rows[0].count),
      totalLocations: parseInt(locationsResult.rows[0].count),
      totalTransactions: parseInt(transactionsResult.rows[0].count),
      lowStockItems: parseInt(lowStockResult.rows[0].count),
      totalValue: parseFloat(valueResult.rows[0].total || '0')
    };
  } finally {
    client.release();
  }
}

export async function getItems(limit = 50): Promise<Item[]> {
  const client = await db.connect();
  try {
    const result = await client.query(`
      SELECT i.*, l.name as location_name 
      FROM items i 
      LEFT JOIN locations l ON i.location_id = l.id 
      ORDER BY i.created_at DESC 
      LIMIT $1
    `, [limit]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getLocations(): Promise<Location[]> {
  const client = await db.connect();
  try {
    const result = await client.query('SELECT * FROM locations ORDER BY name');
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getRecentTransactions(limit = 20): Promise<StockTransaction[]> {
  const client = await db.connect();
  try {
    const result = await client.query(`
      SELECT st.*, i.name as item_name, i.sku
      FROM stock_transactions st
      JOIN items i ON st.item_id = i.id
      ORDER BY st.created_at DESC
      LIMIT $1
    `, [limit]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getLowStockItems(): Promise<Item[]> {
  const client = await db.connect();
  try {
    const result = await client.query(`
      SELECT i.*, l.name as location_name
      FROM items i
      LEFT JOIN locations l ON i.location_id = l.id
      WHERE i.current_stock <= i.minimum_stock
      ORDER BY (i.current_stock - i.minimum_stock) ASC
    `);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getUsers(limit = 50): Promise<User[]> {
  const client = await db.connect();
  try {
    const result = await client.query(`
      SELECT u.*, 0 as teams_count, 0 as memberships_count
      FROM users u
      ORDER BY u.created_at DESC
      LIMIT $1
    `, [limit]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getTeams(limit = 50): Promise<(Team & { user_name: string; members_count: number; items_count: number; locations_count: number })[]> {
  const client = await db.connect();
  try {
    // First, check if team_memberships table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'team_memberships'
      );
    `);
    
    const hasTeamMemberships = tableCheck.rows[0].exists;
    
    let query = `
      SELECT t.*, 
             u.email as user_name,
    `;
    
    if (hasTeamMemberships) {
      query += `
             COALESCE(tm.members_count, 0) as members_count,
      `;
    } else {
      query += `
             0 as members_count,
      `;
    }
    
    query += `
             COALESCE(ti.items_count, 0) as items_count,
             COALESCE(tl.locations_count, 0) as locations_count
      FROM teams t
      LEFT JOIN users u ON t.user_id = u.id
    `;
    
    if (hasTeamMemberships) {
      query += `
      LEFT JOIN (
        SELECT team_id, COUNT(*) as members_count
        FROM team_memberships
        GROUP BY team_id
      ) tm ON t.id = tm.team_id
      `;
    }
    
    query += `
      LEFT JOIN (
        SELECT team_id, COUNT(*) as items_count
        FROM items
        GROUP BY team_id
      ) ti ON t.id = ti.team_id
      LEFT JOIN (
        SELECT team_id, COUNT(*) as locations_count
        FROM locations
        GROUP BY team_id
      ) tl ON t.id = tl.team_id
      ORDER BY t.created_at DESC
      LIMIT $1
    `;
    
    const result = await client.query(query, [limit]);
    return result.rows;
  } finally {
    client.release();
  }
}
