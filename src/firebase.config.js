import {getApp,getApps,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import{getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBdYh_67eHvHZRDJGgnyYX5hFrvzRccC7k",
    authDomain: "restaurantapp-67287.firebaseapp.com",
    databaseURL: "https://restaurantapp-67287-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-67287",
    storageBucket: "restaurantapp-67287.appspot.com",
    messagingSenderId: "471178605663",
    appId: "1:471178605663:web:2e4f01d72168b8d0e517ea"
  };
  const app= getApps.length>0?getApp():initializeApp(firebaseConfig);
  const firestore=getFirestore(app)
  const storage=getStorage(app)

  export {app,firestore,storage};