// ====================================================================
-- PRATYUSH MISHRA - SUPABASE POSTGRESQL CLIENT CONNECTOR
// Connects to your live Supabase project to fetch verified credentials & internships
// ====================================================================

const SUPABASE_CONFIG = {
  // Replace these with your actual Supabase project keys from https://supabase.com
  url: "https://YOUR_PROJECT_REF.supabase.co",
  anonKey: "YOUR_SUPABASE_ANON_KEY"
};

/**
 * Fetch all verified certificates chronologically (Newest first)
 */
async function fetchCertificatesFromSupabase() {
  try {
    if (SUPABASE_CONFIG.url.includes("YOUR_PROJECT_REF")) {
      console.log("Supabase URL pending configuration. Using local PostgreSQL-verified dataset.");
      return null;
    }

    const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/certificates?select=*&is_verified=eq.true&order=issue_date.desc`, {
      headers: {
        "apikey": SUPABASE_CONFIG.anonKey,
        "Authorization": `Bearer ${SUPABASE_CONFIG.anonKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase query failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn("Could not reach Supabase REST endpoint:", error);
    return null;
  }
}

/**
 * Fetch verified internships and industrial training records
 */
async function fetchInternshipsFromSupabase() {
  try {
    if (SUPABASE_CONFIG.url.includes("YOUR_PROJECT_REF")) return null;

    const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/certificates?select=*&is_internship=eq.true&order=issue_date.desc`, {
      headers: {
        "apikey": SUPABASE_CONFIG.anonKey,
        "Authorization": `Bearer ${SUPABASE_CONFIG.anonKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

// Export for module or global use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchCertificatesFromSupabase, fetchInternshipsFromSupabase, SUPABASE_CONFIG };
}
