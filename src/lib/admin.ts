import { supabase } from '@/integrations/supabase/client';

// Pricing Plans Management
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
}

export interface AdminSettings {
  id: string;
  setting_key: string;
  setting_value: string;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Get all admin settings
export const getAdminSettings = async (): Promise<{ settings: AdminSettings[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      return { settings: null, error: error.message };
    }

    return { settings: data, error: null };
  } catch (error) {
    return { settings: null, error: 'Failed to fetch admin settings' };
  }
};

// Update admin setting
export const updateAdminSetting = async (key: string, value: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('admin_settings')
      .upsert({
        setting_key: key,
        setting_value: value,
        updated_at: new Date().toISOString()
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: 'Failed to update setting' };
  }
};

// Get all FAQs
export const getFAQs = async (): Promise<{ faqs: FAQ[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      return { faqs: null, error: error.message };
    }

    return { faqs: data, error: null };
  } catch (error) {
    return { faqs: null, error: 'Failed to fetch FAQs' };
  }
};

// Create FAQ
export const createFAQ = async (question: string, answer: string, category: string, displayOrder: number): Promise<{ faq: FAQ | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .insert({
        question,
        answer,
        category,
        display_order: displayOrder
      })
      .select()
      .single();

    if (error) {
      return { faq: null, error: error.message };
    }

    return { faq: data, error: null };
  } catch (error) {
    return { faq: null, error: 'Failed to create FAQ' };
  }
};

// Update FAQ
export const updateFAQ = async (id: string, question: string, answer: string, category: string, displayOrder: number): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('faqs')
      .update({
        question,
        answer,
        category,
        display_order: displayOrder,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: 'Failed to update FAQ' };
  }
};

// Delete FAQ
export const deleteFAQ = async (id: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: 'Failed to delete FAQ' };
  }
};

// Get pricing plans from settings
export const getPricingPlans = async (): Promise<{ plans: PricingPlan[] | null; error: string | null }> => {
  try {
    const { settings, error } = await getAdminSettings();
    if (error || !settings) {
      return { plans: null, error: error || 'No settings found' };
    }

    const pricingSettings = settings.find(s => s.setting_key === 'pricing_plans');
    if (!pricingSettings) {
      return { plans: null, error: 'Pricing plans not found' };
    }

    const plans = JSON.parse(pricingSettings.setting_value);
    return { plans, error: null };
  } catch (error) {
    return { plans: null, error: 'Failed to parse pricing plans' };
  }
};

// Update pricing plans
export const updatePricingPlans = async (plans: PricingPlan[]): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { success, error } = await updateAdminSetting('pricing_plans', JSON.stringify(plans));
    return { success, error };
  } catch (error) {
    return { success: false, error: 'Failed to update pricing plans' };
  }
};

// Get job posting fee
export const getJobPostingFee = async (): Promise<{ fee: number | null; error: string | null }> => {
  try {
    const { settings, error } = await getAdminSettings();
    if (error || !settings) {
      return { fee: null, error: error || 'No settings found' };
    }

    const feeSetting = settings.find(s => s.setting_key === 'job_posting_fee');
    if (!feeSetting) {
      return { fee: null, error: 'Job posting fee not found' };
    }

    return { fee: parseInt(feeSetting.setting_value), error: null };
  } catch (error) {
    return { fee: null, error: 'Failed to parse job posting fee' };
  }
};

// Update job posting fee
export const updateJobPostingFee = async (fee: number): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { success, error } = await updateAdminSetting('job_posting_fee', fee.toString());
    return { success, error };
  } catch (error) {
    return { success: false, error: 'Failed to update job posting fee' };
  }
};
