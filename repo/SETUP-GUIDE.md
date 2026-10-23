# Hisana Wall — shared guestbook setup

This package connects `wall.html` to a shared Supabase database. Notes are public and appear automatically. Only your authenticated admin account, explicitly registered in the database, can delete notes.

## 1. Create the free backend
1. Go to https://supabase.com/ and sign in/create an account.
2. Create a new project. Save the database password somewhere safe.
3. Wait for the project to finish provisioning.

## 2. Create the guestbook tables and security rules
1. Open your project in Supabase.
2. Go to **SQL Editor** → **New query**.
3. Open `supabase-setup.sql` from this folder, copy all its contents into the editor, and click **Run**.
4. Do not skip this step. Row Level Security policies are what protect the delete action.

## 3. Create your owner login
1. In Supabase, open **Authentication** → **Users** → **Add user** / **Create new user**.
2. Enter your own email and a strong password. Confirm the user if the dashboard offers that option.
3. Copy that user's **UID** from the Users table.
4. Open **SQL Editor** and run this command, replacing the example UID with your actual UID:

```sql
insert into public.guestbook_admins (user_id)
values ('PASTE-YOUR-AUTH-USER-UID-HERE');
```

This registration is what grants delete permission. Never add visitors as admins.

## 4. Connect `wall.html`
1. Open `wall.html` in a code editor (VS Code is fine).
2. Find these two lines near the bottom:

```js
const SUPABASE_URL = 'PASTE_YOUR_SUPABASE_PROJECT_URL_HERE';
const SUPABASE_ANON_KEY = 'PASTE_YOUR_SUPABASE_ANON_KEY_HERE';
```

3. In Supabase, open **Project Settings** → **API** (sometimes shown as **Data API / API Keys**).
4. Copy the **Project URL** into `SUPABASE_URL`.
5. Copy the **anon / publishable public key** into `SUPABASE_ANON_KEY`.
6. Save the file.

**Never paste a `service_role` or secret key into browser code.** The public/anon key is designed to be used in the browser; the SQL permissions protect your data.

## 5. Test before publishing
1. Open `wall.html` through a local web server or your hosting preview. (VS Code's Live Server extension works.) Some browsers restrict scripts when opening files directly with `file://`.
2. Submit a test note. It should appear on the wall.
3. Open the same wall URL in another browser/device. The same note should appear.
4. Click **Admin sign in**, use the email/password created in step 3, and verify a **DELETE ×** button appears on notes.
5. Delete a test note. Sign out; delete buttons should disappear and deleting should no longer be possible.
6. Test theme switching in both modes.

## 6. Publish the site
Upload `wall.html` and the existing portfolio files/folders (`index.html`, `css/`, `js/`, `assets/`) to the same static hosting project. Keep the file/folder structure intact. The wall URL will be `your-domain/wall.html` unless your host has a rewrite rule for `/wall`.

## Important limits and safety
- This is a small public guestbook, not a fully moderated social network. The public form is intentionally open, so spam is possible. The frontend has basic length checks; Supabase enforces length checks too. Add CAPTCHA / a server-side rate limit before heavily promoting it.
- Do not collect private information. Submitted notes and links are public.
- The SQL prevents public users from deleting notes or changing the admin list. Keep your Supabase owner account secure.
- If a delete fails, verify that your logged-in Auth user's UID exists in `public.guestbook_admins`.
- If the table already exists from a previous attempt, inspect it before rerunning SQL.
