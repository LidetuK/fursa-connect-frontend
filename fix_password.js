import bcrypt from 'bcrypt';

async function generateHash() {
  const password = 'admin123';
  const hash = await bcrypt.hash(password, 10);
  console.log('Password:', password);
  console.log('Correct Bcrypt Hash:', hash);
  
  // Verify the hash works
  const isValid = await bcrypt.compare(password, hash);
  console.log('Hash verification:', isValid);
  
  // Test the old hash
  const oldHash = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
  const oldIsValid = await bcrypt.compare(password, oldHash);
  console.log('Old hash verification for admin123:', oldIsValid);
  
  // Test what the old hash is actually for
  const testPasswords = ['password', 'admin', 'admin123', 'skilllinkpremium', '123456'];
  for (const testPass of testPasswords) {
    const testValid = await bcrypt.compare(testPass, oldHash);
    if (testValid) {
      console.log(`Old hash is actually for password: "${testPass}"`);
      break;
    }
  }
}

generateHash().catch(console.error); 