import firebase, { auth, db } from './config';

export async function signInWithGoogle() {
  const ggProvider = new firebase.auth.GoogleAuthProvider();
  const { user, additionalUserInfo } = await auth.signInWithPopup(ggProvider);
  if (additionalUserInfo?.isNewUser) {
    addDocument('users', {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      providerId: additionalUserInfo.providerId,
      keywords: generateKeywords(user.displayName?.toLowerCase()),
    });
  }
}

export async function signInWithFacebook() {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const { user, additionalUserInfo } = await auth.signInWithPopup(fbProvider);
  if (additionalUserInfo?.isNewUser) {
    addDocument('users', {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      providerId: additionalUserInfo.providerId,
      keywords: generateKeywords(user.displayName?.toLowerCase()),
    });
  }
}

export function signOut() {
  auth.signOut();
}

export function onAuthStateChanged(authStateObserver) {
  // Listen to auth state changes.
  return auth.onAuthStateChanged(authStateObserver);
}

export function signInWithEmail(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export async function addDocument(collection, data) {
  try {
    await db.collection(collection).add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
}

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(' ').filter((word) => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = '';
    name.split('').forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
