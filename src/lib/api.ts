export async function testLoginEndpoint() {
  console.log('=== TESTING LOGIN ENDPOINT ===');
  
  // Test with admin credentials
  const testCredentials = [
    { email: 'admin', password: 'admin123', type: 'Admin' },
    { email: 'superadmin', password: 'SuperAdmin@2024', type: 'Super Admin' },
    { email: 'meron', password: 'Meron@123', type: 'Regular Admin' },
    { email: 'testuser@example.com', password: 'TestUser@123', type: 'Regular User' }
  ];
  
  for (const cred of testCredentials) {
    try {
      console.log(`Testing ${cred.type} login with email: ${cred.email}`);
      
      const res = await fetch('https://fursaconnet-production.up.railway.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cred.email, password: cred.password }),
        credentials: 'include',
      });
      
      console.log(`${cred.type} login response status:`, res.status);
      console.log(`${cred.type} login response headers:`, res.headers);
      
      if (res.ok) {
        const data = await res.json();
        console.log(`${cred.type} login SUCCESS:`, data);
        return { success: true, credentials: cred, data };
      } else {
        const errorText = await res.text();
        console.log(`${cred.type} login FAILED:`, errorText);
        console.log(`${cred.type} login response status:`, res.status);
        console.log(`${cred.type} login response headers:`, res.headers);
      }
    } catch (error) {
      console.error(`${cred.type} login ERROR:`, error);
      console.error(`${cred.type} login ERROR details:`, {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
  }
  
  console.log('=== ALL LOGIN TESTS FAILED ===');
  return { success: false };
}

export async function registerUser({ email, password, name }: { email: string; password: string; name: string }) {
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Registration failed');
  return res.json();
}

export async function loginUser({ email, password }: { email: string; password: string }) {
  console.log('=== FRONTEND LOGIN START ===');
  console.log('loginUser called with email:', email);
  console.log('Cookies before login:', document.cookie);
  
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  
  console.log('Login response status:', res.status);
  console.log('Login response headers:', res.headers);
  
  if (!res.ok) {
    const errorText = await res.text();
    console.log('Login error response:', errorText);
    throw new Error(errorText || 'Login failed');
  }
  
  const data = await res.json();
  console.log('Login success - received data:', data);
  
  // Check if cookies were set
  console.log('Cookies after login:', document.cookie);
  console.log('=== FRONTEND LOGIN END ===');
  
  return data;
}

export async function verifyJwt() {
  console.log('Verifying JWT manually...');
  console.log('Current cookies:', document.cookie);
  
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/verify-jwt', {
    method: 'GET',
    credentials: 'include',
  });
  
  const data = await res.json();
  console.log('JWT verification result:', data);
  return data;
}

export async function getSmeUsers() {
  console.log('Getting SME users...');
  
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/sme-users', {
    method: 'GET',
  });
  
  const data = await res.json();
  console.log('SME users result:', data);
  return data;
}

export async function listUsers() {
  console.log('Listing all users...');
  
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/list-users', {
    method: 'GET',
  });
  
  const data = await res.json();
  console.log('List users result:', data);
  return data;
}

export async function ping() {
  console.log('Pinging backend...');
  console.log('Current cookies:', document.cookie);
  
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/ping', {
    method: 'GET',
    credentials: 'include',
  });
  
  console.log('Ping response status:', res.status);
  
  const data = await res.json();
  console.log('Ping response:', data);
  return data;
}

export async function testProtected() {
  console.log('Testing protected endpoint...');
  console.log('Current cookies:', document.cookie);
  
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/test-protected', {
    method: 'GET',
    credentials: 'include',
  });
  
  console.log('Protected endpoint response status:', res.status);
  
  if (res.status === 401) {
    console.log('401 Unauthorized from protected endpoint');
    const responseText = await res.text();
    console.log('Response text:', responseText);
    return { success: false, status: 401, message: 'Unauthorized' };
  }
  
  const data = await res.json();
  console.log('Protected endpoint success:', data);
  return { success: true, data };
}

export async function healthCheck() {
  console.log('Checking backend health...');
  
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/health', {
    method: 'GET',
  });
  
  const data = await res.json();
  console.log('Health check result:', data);
  return data;
}

export async function testDatabase() {
  console.log('Testing database connection...');
  
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/test-db', {
    method: 'GET',
  });
  
  const data = await res.json();
  console.log('Database test result:', data);
  return data;
}

export async function testJwt() {
  console.log('Testing JWT functionality...');
  
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/test-jwt', {
    method: 'GET',
  });
  
  const data = await res.json();
  console.log('JWT test result:', data);
  return data;
}

export async function testAuth() {
  console.log('Testing authentication...');
  console.log('Current cookies:', document.cookie);
  
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/test', {
    method: 'GET',
    credentials: 'include',
  });
  
  const data = await res.json();
  console.log('Auth test result:', data);
  return data;
}

export async function getCurrentUser() {
  console.log('=== FRONTEND GET CURRENT USER START ===');
  console.log('getCurrentUser called - checking authentication...');
  console.log('Current cookies:', document.cookie);
  
  // Use cookies instead of localStorage tokens to match backend authentication
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/me', {
    method: 'GET',
    credentials: 'include', // This sends cookies
  });
  
  console.log('Auth/me response status:', res.status);
  console.log('Auth/me response headers:', res.headers);
  
  if (res.status === 401) {
    console.log('401 Unauthorized - no valid authentication found');
    const responseText = await res.text();
    console.log('Response text:', responseText);
    console.log('=== FRONTEND GET CURRENT USER END (401) ===');
    return null;
  }
  if (!res.ok) {
    const errorText = await res.text();
    console.log('Auth/me error response:', errorText);
    console.log('=== FRONTEND GET CURRENT USER END (ERROR) ===');
    throw new Error((await res.json()).message || 'Failed to fetch user');
  }
  
  const data = await res.json();
  console.log('Auth/me success - user data:', data);
  console.log('=== FRONTEND GET CURRENT USER END (SUCCESS) ===');
  return data.user;
}

export async function registerSme({ email, company_name, password, company_logo }: { email: string; company_name: string; password: string; company_logo: string }) {
  const res = await fetch('https://fursaconnet-production.up.railway.app/auth/register-sme', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, company_name, password, company_logo }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error((await res.json()).message || 'SME registration failed');
  return res.json();
} 