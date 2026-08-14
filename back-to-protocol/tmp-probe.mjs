import { createClient } from '@supabase/supabase-js';

const url = 'https://umstlyjytahmffirkmyl.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtc3RseWp5dGFobWZmaXJrbXlsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjQ1MjQ3MywiZXhwIjoyMTAyMDI4NDczfQ.5-XryP2O2ooAmJPIT2acgXYmtB_2IVyGJfAu-QYROH8';

const supabase = createClient(url, key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

try {
  const { data, error } = await supabase.from('products').select('*').limit(10);
  console.log('ERROR', error ? error.message : 'NONE');
  console.log('DATA', JSON.stringify(data, null, 2));
} catch (err) {
  console.error('THREW', err instanceof Error ? err.message : String(err));
  process.exitCode = 1;
}
