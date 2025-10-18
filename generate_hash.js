const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'skilllinkpremium';
  const hash = await bcrypt.hash(password, 10);
  console.log('Password:', password);
  console.log('Bcrypt Hash:', hash);
  
  // Verify the hash works
  const isValid = await bcrypt.compare(password, hash);
  console.log('Hash verification:', isValid);
}

generateHash().catch(console.error); 