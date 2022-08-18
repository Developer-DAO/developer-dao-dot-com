import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

async function main() {
  try {
    console.log('\n');
    console.log('🚨🚨 Frontend Deploy In Progress 🚨🚨');
    console.log('\n');
    await axios.post(process.env.VERCEL_WEBHOOK_URL);

    console.log('🚨🚨 Frontend Deploy Started 🚨🚨');
  } catch (error) {
    console.log(error);
    throw new Error('Frontend Deploy failed');
  }
}

main()
  .then()
  .catch(() => process.exit(1));
