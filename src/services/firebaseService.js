import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    setDoc,
    query,
    collection,
    where,
    getDoc,
    getDocs,
    updateDoc,
    documentId,
    onSnapshot,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from './firebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logInWithEmailAndPassword = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const authUser = auth.currentUser;
            return authUser;
        })
        .catch((error) => {
            throw error;
        });
};

const signUpWithEmailAndPass = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            throw error;
        });
};

const isUsernameExist = async (username) => {
    try {
        const q = query(collection(db, 'users'), where('username', '==', username));
        const users = await getDocs(q);
        let userInDb = null;
        users.forEach((doc) => {
            userInDb = {
                uid: doc.id,
                username: doc.data().username,
                status: doc.data().status,
                imgurl: doc.data().pic,
                chatfriends: doc.data().chatfriends,
            };
        });
        return userInDb;
    } catch (err) {
        throw err;
    }
};

const setDocumentInFirestore = async (collection, document, object) => {
    try {
        await setDoc(doc(db, collection, document), object);
        return true;
    } catch (err) {
        throw err;
    }
};

const getMultipleDocsFromFirestore = async (coll, docArray) => {
    try {
        const q = query(collection(db, coll), where(documentId(), 'in', docArray));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                uid: doc.id,
                username: doc.data().username,
                status: doc.data().status,
                imgurl: doc.data().pic,
            });
        });
        return data;
    } catch (err) {
        console.log(err);
    }
};

const getDocumentFromFireStore = async (collection, document) => {
    try {
        const docRef = doc(db, collection, document);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (err) {
        throw err;
    }
};

const getChatsFromFireStore = async (doc) => {
    try {
        const q = query(collection(db, 'chat', doc, doc));
        const chats = await getDocs(q);
    } catch (err) {
        console.log(err);
    }
};

const chatListener = (docPath, callback) => {
    const colRef = collection(db, 'chat', docPath, docPath);

    const unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push(doc.data());
            });
            callback(data);
        },
        (error) => {
            console.log(error);
        },
    );

    return () => unsubscribe();
};

const sendMessage = async (docPath, docId, chatObj) => {
    try {
        await setDoc(doc(db, 'chat', docPath, docPath, docId), chatObj);
    } catch (err) {
        console.log(err);
    }
};

const updateDocField = async (coll, docc, keyValueObj) => {
    try {
        const docRef = doc(db, coll, docc);
        const res = await updateDoc(docRef, keyValueObj);
    } catch (err) {
        console.log(err);
    }
};

const uploadImage =async (file,filename) => {
    try {
        const storageRef = ref(storage, `images/${filename}`);
        const uploadTask = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        return await signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                return user;
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (err) {}
};

export {
    logInWithEmailAndPassword,
    signUpWithEmailAndPass,
    setDocumentInFirestore,
    isUsernameExist,
    signInWithGoogle,
    getDocumentFromFireStore,
    getMultipleDocsFromFirestore,
    getChatsFromFireStore,
    updateDocField,
    sendMessage,
    chatListener,
    uploadImage,
};
