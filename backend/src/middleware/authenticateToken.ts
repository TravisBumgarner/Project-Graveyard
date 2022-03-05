import admin, { ServiceAccount } from 'firebase-admin';
import { getConnection } from 'typeorm';

import serviceAccount from './serviceAccountKey.json';
import { entity } from '../db';

const getUserIdFromFirebaseId = async (firebaseId: string) => {
  const data = await getConnection()
    .getRepository(entity.User)
    .createQueryBuilder('user')
    .where('user.firebaseId = :firebaseId', { firebaseId })
    .getOne();

  return data ? data.id : null;
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

const decodeIDToken = async (req, res, next) => {
  const header = req.headers?.authorization;
  if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.authenticatedUserId = await getUserIdFromFirebaseId(decodedToken.user_id);
      req.firebaseId = decodedToken.user_id;
    } catch (err) {
      console.log(err);
    }
  }
  next();
};
export default decodeIDToken;
