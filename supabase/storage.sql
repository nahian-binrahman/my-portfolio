-- 1. Create the bucket
-- Note: You can do this in the Supabase Dashboard under Storage -> New Bucket
-- Bucket Name: media
-- Public: Yes

-- 2. Storage Policies
-- Allow public to view images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'media' );

-- Allow authenticated admins to upload/delete
-- (This assumes users are checked via middleware/API, but RLS adds extra safety)
CREATE POLICY "Admin Upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media' AND
  (select auth.jwt() ->> 'email') = current_setting('app.settings.admin_email', true)
);

CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'media' AND
  (select auth.jwt() ->> 'email') = current_setting('app.settings.admin_email', true)
);
