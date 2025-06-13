import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  where 
} from 'firebase/firestore';
import { db } from '../firebase/config';

const SCORES_COLLECTION = 'scores';

// Save a new score to Firestore
export const saveScore = async (scoreData) => {
  try {
    const docRef = await addDoc(collection(db, SCORES_COLLECTION), scoreData);
    return docRef.id;
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};

// Get top scores from Firestore
export const getTopScores = async (limitCount = 10) => {
  try {
    const q = query(
      collection(db, SCORES_COLLECTION),
      orderBy('score', 'asc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const scores = [];
    
    querySnapshot.forEach((doc) => {
      scores.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return scores;
  } catch (error) {
    console.error('Error fetching top scores:', error);
    throw error;
  }
};

// Get user's personal scores
export const getUserScores = async (userId) => {
  try {
    const q = query(
      collection(db, SCORES_COLLECTION),
      where('userId', '==', userId),
      orderBy('score', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const scores = [];
    
    querySnapshot.forEach((doc) => {
      scores.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return scores;
  } catch (error) {
    console.error('Error fetching user scores:', error);
    throw error;
  }
};

// Get user's best score
export const getUserBestScore = async (userId) => {
  try {
    const q = query(
      collection(db, SCORES_COLLECTION),
      where('userId', '==', userId),
      orderBy('score', 'asc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user best score:', error);
    throw error;
  }
};