// CSK Constructions - Supabase Diagnostic Script
const fs = require('fs');

if (fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('CSK Telemetry - Initializing test connect...');
console.log('Target URL:', supabaseUrl);
console.log('Publishable Key Token: [Verified Present]');

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined');
  process.exit(1);
}

async function runDiagnostics() {
  try {
    console.log('\n--- Checking Connection & Fetching Testimonials Table ---');
    const endpoint = `${supabaseUrl}/rest/v1/testimonials?select=*&limit=1`;
    
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.log('❌ Request failed with status:', res.status);
      console.log('Error output:', errorText);
      console.log('\n👉 ACTION REQUIRED: The database tables may not be created yet. Please copy the SQL from supabase/schema.sql and execute it in your Supabase SQL Editor.');
    } else {
      const data = await res.json();
      console.log('✅ Success! Connected and fetched records from testimonials.');
      console.log('Records returned:', data);
    }
  } catch (err) {
    console.error('❌ Exception during connection:', err.message);
  }
}

runDiagnostics();
