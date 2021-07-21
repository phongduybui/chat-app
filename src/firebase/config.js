import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCyPkHsgxDaK0678MOyiFHz3jRAoU6OxhI',
  authDomain: 'genz-chat.firebaseapp.com',
  projectId: 'genz-chat',
  storageBucket: 'genz-chat.appspot.com',
  messagingSenderId: '800467247530',
  appId: '1:800467247530:web:14dc62bc3a522c12b90bd3',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// if (window.location.hostname === 'localhost') {
//   auth.useEmulator('http://localhost:9099');
//   db.useEmulator('localhost', '8080');
// }

export { auth, db, storage };
export default firebase;
