import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCzMIvgSrQgnLlHfseqESZi-DKm1K3Bl2M',
  authDomain: 'bds-project-13c56.firebaseapp.com',
  databaseURL: 'https://bds-project-13c56.firebaseio.com',
  projectId: 'bds-project-13c56',
  storageBucket: 'bds-project-13c56.appspot.com',
  messagingSenderId: '1020242211557',
  appId: '1:1020242211557:web:57284c99e48c0842599a0c',
  measurementId: 'G-31GJYNMR28',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
