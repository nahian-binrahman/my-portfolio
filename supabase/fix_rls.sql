-- Allow authenticated users (The Admin) to perform all operations
-- Note: We rely on the App Layer (requireAdmin) to ensure only the specific Admin Email works.

-- POSTS
CREATE POLICY "Allow admin full access to posts"
ON public.posts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- PROJECTS
CREATE POLICY "Allow admin full access to projects"
ON public.projects
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- SITE SETTINGS
CREATE POLICY "Allow admin full access to site_settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
