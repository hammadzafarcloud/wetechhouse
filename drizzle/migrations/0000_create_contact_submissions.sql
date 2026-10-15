CREATE TABLE public.contact_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 255),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 30),
 course text NOT NULL CHECK (char_length(course) <= 150),
 learning text NOT NULL CHECK (learning IN ('On-campus', 'Online')),
 message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 2000)
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;