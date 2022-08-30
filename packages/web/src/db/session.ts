import {
  CollectionReference,
  DocumentData,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import {
  isSessionInDB,
  Session,
  sessionDBToSession,
  SessionInDB,
} from "./types";

const lastAccessUpdateDelay = 24 * 60 * 60 * 1000;

export const updateSessionLastAccess =
  (sessionCollectionRef: CollectionReference<DocumentData>) =>
  async (sessionId: string, lastAccess: Date): Promise<Date> => {
    const now = new Date();
    if (now.valueOf() - lastAccess.valueOf() > lastAccessUpdateDelay) {
      await updateDoc(doc(sessionCollectionRef, sessionId), {
        lastAccess: Timestamp.fromDate(new Date()),
      });
      return new Date();
    }
    return lastAccess;
  };

export const loadSession =
  (sessionCollectionRef: CollectionReference<DocumentData>) =>
  async (sessionId: string): Promise<Session> => {
    const session = await getDoc(doc(sessionCollectionRef, sessionId));
    const data = session.data();
    if (!session.exists() || !isSessionInDB(data)) {
      return createSession(sessionCollectionRef)();
    }
    return sessionDBToSession(data);
  };

export const createSession =
  (sessionCollectionRef: CollectionReference<DocumentData>) =>
  async (): Promise<Session> => {
    const id = nanoid(10);
    const sessionObject: SessionInDB = {
      id,
      createdAt: Timestamp.fromDate(new Date()),
      lastAccess: Timestamp.fromDate(new Date()),
    };
    try {
      await setDoc(doc(sessionCollectionRef, id), sessionObject);
    } catch (e) {
      let msg = "Couldn't create a new session. ";
      if (typeof e === "string") {
        msg += e;
      } else if (e instanceof Error) {
        msg += e.message;
      }
      throw new Error(msg);
    }
    return sessionDBToSession(sessionObject);
  };
