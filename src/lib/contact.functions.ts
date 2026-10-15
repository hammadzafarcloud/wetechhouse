import { createServerFn } from '@tanstack/react-start';
import { contactSchema } from './contact-schema';

export const submitContact = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { success: false };
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { website: _website, ...submission } = data;
    const { error } = await supabaseAdmin.from('contact_submissions').insert(submission);
    if (error) throw new Error('Your message could not be saved. Please try again.');
    return { success: true };
  });