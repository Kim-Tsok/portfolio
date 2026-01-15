# Admin User Setup

This directory contains scripts to set up your Supabase database and create admin users.

## Creating an Admin User

You have two options to create an admin user:

### Option 1: Using the Script (Recommended)

1. **Get your Supabase Service Role Key:**
   - Go to your Supabase Dashboard: https://supabase.com/dashboard
   - Select your project
   - Go to **Settings** → **API**
   - Copy the **`service_role`** key (⚠️ Keep this secret! Never commit it to git)

2. **Add it to your `.env.local` file:**
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

3. **Install dependencies (if needed):**
   ```bash
   npm install @supabase/supabase-js tsx --save-dev
   ```

4. **Run the script:**
   ```bash
   npx tsx scripts/create-admin-user.ts admin@example.com your-password
   ```

### Option 2: Using Supabase Dashboard (Manual)

1. Go to your Supabase Dashboard → **Authentication** → **Users**
2. Click **"Add User"** → **"Create new user"**
3. Enter:
   - **Email**: Your admin email
   - **Password**: Your admin password
   - **Auto Confirm User**: ✅ Check this box
4. Click **"Create User"**
5. After the user is created, click on the user to edit them
6. Scroll down to **"Raw User Meta Data"**
7. Add the following JSON:
   ```json
   {
     "is_admin": true
   }
   ```
8. Click **"Save"**

### Verify Admin Access

After creating the admin user, you can:
- Login at: `http://localhost:3000/admin/login`
- Use the email and password you just created

## Database Setup

Run the SQL scripts in order to set up your database tables:

1. `001_create_tables.sql` - Creates projects and skills tables with RLS policies
2. `002_add_services_table.sql` - Adds services table

You can run these in your Supabase Dashboard → **SQL Editor**.

