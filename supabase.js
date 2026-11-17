const SUPABASE_URL = "https://btzuvdxbtgbqgmyuhqih.supabase.co/rest/v1/";

const SUPABASE_KEY = "sb_publishable_JvONPCRm8aqW94aIj6jbcA_rwl8DsHx";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Conexão com Supabase inicializada!");