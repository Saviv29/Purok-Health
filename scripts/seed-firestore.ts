import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

import { environment } from '../src/environments/environment';

const firebaseConfig = environment.firebase;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  const dataPath = path.join(__dirname, '../src/assets/facilities.json');
  const facilities = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log('Seeding Firestore...');

  for (const facility of facilities) {
    // Generate a simple ID if not present
    const id = facility.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    await setDoc(doc(db, 'facilities', id), facility);
    console.log(`- Added: ${facility.name}`);
  }

  console.log('Finished seeding!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
