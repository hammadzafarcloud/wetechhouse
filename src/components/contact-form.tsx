import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactSchema } from '@/lib/contact-schema';
import { submitContact } from '@/lib/contact.functions';

export function ContactForm({ course = 'General enquiry', compact = false }: { course?: string; compact?: boolean }) {
  const send = useServerFn(submitContact);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  if (status === 'sent') return <div className="contact-success" role="status"><CheckCircle2 /><h3>Message received.</h3><p>Thank you for contacting Wetech House. Your enquiry has been sent to our team.</p><Button variant="outline" onClick={() => setStatus('idle')}>Send another message</Button></div>;
  return <form className={`contact-form ${compact ? 'compact' : ''}`} onSubmit={async event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = contactSchema.safeParse(Object.fromEntries(form.entries()));
    if (!result.success) { setError(result.error.issues[0]?.message ?? 'Please check your details.'); return; }
    setError(''); setStatus('sending');
    try { const response = await send({ data: result.data }); if (!response.success) throw new Error('Please try again.'); setStatus('sent'); }
    catch (err) { setError(err instanceof Error ? err.message : 'Please try again.'); setStatus('idle'); }
  }}>
    <div className="form-row"><label>Full name<input name="name" autoComplete="name" placeholder="Your full name" minLength={2} maxLength={100} required /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={255} required /></label></div>
    <div className="form-row"><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+92" minLength={7} maxLength={30} required /></label><label>Preferred classes<select name="learning"><option>On-campus</option><option>Online</option></select></label></div>
    <label>Interested course<input name="course" defaultValue={course} maxLength={150} required /></label>
    <label>Your message<textarea name="message" placeholder="Tell us what you’d like to learn…" maxLength={2000} rows={3} /></label>
    <div className="form-honeypot" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
    {error && <p role="alert" className="form-error">{error}</p>}
    <Button type="submit" size="lg" disabled={status === 'sending'}>{status === 'sending' ? <><LoaderCircle className="animate-spin" /> Sending…</> : <>Send Message <ArrowRight /></>}</Button>
  </form>;
}