/* Site configuration. The Supabase publishable key is safe to expose in the
   browser — Row Level Security on `debra_leads` only permits INSERTs, never reads. */
window.SITE_CONFIG = {
  SUPABASE_URL: "https://yezzmplootvssyrvsauf.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_JdFhlLqi5UXVHkWEUrJcVg_4vCxbQ5b",
  LEADS_TABLE: "debra_leads",
  // Fallback contact if the database call ever fails:
  FALLBACK_EMAIL: "debrashouse@gmail.com"
};
