import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  full_name: string;
  user_type: 'writer' | 'business' | 'admin';
  avatar_url?: string;
  bio?: string;
  skills?: string[];
  location?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User | null;
  error: string | null;
}

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// Verify password
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Sign up user
export const signUp = async (email: string, password: string, fullName: string, userType: string = 'business'): Promise<AuthResponse> => {
  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return { user: null, error: 'User already exists with this email' };
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email,
        password_hash: passwordHash,
        full_name: fullName,
        user_type: userType,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      return { user: null, error: error.message };
    }

    return { user, error: null };
  } catch (error) {
    return { user: null, error: 'An error occurred during signup' };
  }
};

// Sign in user
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // Get user by email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error || !user) {
      return { user: null, error: 'Invalid email or password' };
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return { user: null, error: 'Invalid email or password' };
    }

    // Remove password_hash from response
    const { password_hash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, error: null };
  } catch (error) {
    return { user: null, error: 'An error occurred during signin' };
  }
};

// Get all users (admin only)
export const getAllUsers = async (): Promise<{ users: User[] | null; error: string | null }> => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { users: null, error: error.message };
    }

    // Remove password_hash from response
    const usersWithoutPasswords = users.map(({ password_hash, ...user }) => user);
    return { users: usersWithoutPasswords, error: null };
  } catch (error) {
    return { users: null, error: 'An error occurred while fetching users' };
  }
};

// Reset user password (admin only)
export const resetUserPassword = async (userId: string, newPassword: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    const passwordHash = await hashPassword(newPassword);

    const { error } = await supabase
      .from('users')
      .update({ password_hash: passwordHash, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: 'An error occurred while resetting password' };
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<User>): Promise<AuthResponse> => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return { user: null, error: error.message };
    }

    // Remove password_hash from response
    const { password_hash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, error: null };
  } catch (error) {
    return { user: null, error: 'An error occurred while updating profile' };
  }
};
