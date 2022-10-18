const firebaseConfig = {
    apiKey: "AIzaSyDro1daaPipor8eX3rcQ_NtV-00bEvvrpE",
    authDomain: "index-1b729.firebaseapp.com",
    projectId: "index-1b729",
    storageBucket: "index-1b729.appspot.com",
    messagingSenderId: "331524593187",
    appId: "1:331524593187:web:1b2aa1af6d3e6b27dbc396"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  
  const db = firebase.firestore();
  
  const auth = firebase.auth();
  let  currentUser

  auth.onAuthStateChanged((user)=>{

    
    if(user){

        currentUser=user
        console.log(user)
      
    }

})