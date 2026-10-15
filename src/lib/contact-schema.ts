import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.').max(255),
  phone: z.string().trim().min(7, 'Please enter a valid phone number.').max(30).regex(/^[+\d\s()-]+$/, 'Please enter a valid phone number.'),
  course: z.string().trim().min(1).max(150),
  learning: z.enum(['On-campus', 'Online']),
  message: z.string().trim().max(2000),
  website: z.string().max(200).optional(),
});