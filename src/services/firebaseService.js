import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
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
    arrayUnion,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from './firebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logInWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    return auth.currentUser;
};

const signUpWithEmailAndPass = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

const isUsernameExist = async (username) => {
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
};

const setDocumentInFirestore = async (collection, document, object) => {
    await setDoc(doc(db, collection, document), object);
    return true;
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
    const docRef = doc(db, collection, document);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
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
        await updateDoc(docRef, keyValueObj);
    } catch (err) {
        console.log(err);
    }
};

const addToChatfriends = async (uid, friendUid) => {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, { chatfriends: arrayUnion(friendUid) });
};

const uploadImage = async (file, filename) => {
    try {
        const storageRef = ref(storage, `images/${filename}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const onAuthChanged = (callback) => {
    return onAuthStateChanged(auth, callback);
};

const signOutUser = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.log(err);
    }
};

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (err) {
        console.log(err);
    }
};

export {
    logInWithEmailAndPassword,
    signUpWithEmailAndPass,
    setDocumentInFirestore,
    isUsernameExist,
    signInWithGoogle,
    getDocumentFromFireStore,
    getMultipleDocsFromFirestore,
    updateDocField,
    addToChatfriends,
    sendMessage,
    chatListener,
    uploadImage,
    onAuthChanged,
    signOutUser,
};
