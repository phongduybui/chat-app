import firebase, { auth, db, storage } from './config';

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

export const fetchUserList = (searchTerm, curMembers) => {
  return db
    .collection('users')
    .where('keywords', 'array-contains', searchTerm?.toLowerCase())
    .orderBy('displayName')
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          displayName: doc.data().displayName,
          uid: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !curMembers.includes(opt.value));
    });
};

export const fetchRoomList = (searchTerm) => {
  return db
    .collection('rooms')
    .where('name', '==', searchTerm)
    .orderBy('name')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
    });
};

export const fetchUserByUID = async (userId) => {
  try {
    const response = await db
      .collection('users')
      .where('uid', '==', userId)
      .get();

    const user = response.docs.map((doc) => ({
      displayName: doc.data().displayName,
      photoURL: doc.data().photoURL,
      uid: doc.data().uid,
      email: doc.data().email,
    }));

    return user[0];
  } catch (err) {
    console.log(err);
  }
};

const LOADING_IMAGE_URL =
  'https://media.giphy.com/media/7VDiGv55B4IX8CHdJU/source.gif';

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
export function saveImageMessage(file, roomId) {
  // 1 - We add a message with a loading icon that will get updated with the shared image.
  db.collection('messages')
    .add({
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      imageUrl: LOADING_IMAGE_URL,
      photoURL: auth.currentUser.photoURL,
      roomId: roomId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function (messageRef) {
      // 2 - Upload the image to Cloud Storage.
      var filePath = roomId + '/' + file.name;
      return firebase
        .storage()
        .ref(filePath)
        .put(file)
        .then(function (fileSnapshot) {
          // 3 - Generate a public URL for the file.
          return fileSnapshot.ref.getDownloadURL().then((url) => {
            // 4 - Update the chat message placeholder with the image's URL.
            return messageRef.update({
              imageUrl: url,
              storageUri: fileSnapshot.metadata.fullPath,
            });
          });
        });
    })
    .catch(function (error) {
      console.error(
        'There was an error uploading a file to Cloud Storage:',
        error
      );
    });
}

export const fetchListImageInRoom = (roomId) => {
  var listRef = storage.ref().child(roomId);

  // Find all the prefixes and items.
  return listRef
    .listAll()
    .then((res) => {
      const urlsPromise = res.items.map((itemRef) => itemRef.getDownloadURL());
      return Promise.all(urlsPromise);
    })
    .catch((error) => {
      console.og(error);
    });
};
