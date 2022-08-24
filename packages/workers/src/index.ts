import admin from "firebase-admin";

const removeExpiredSessions = async (): Promise<string[]> => {
  if (!process.env["SVC_ACCOUNT_FILE"]) {
    throw new Error("SVC_ACCOUNT_FILE env variable is not set. Exiting");
  }
  if (!process.env["DATABASE_URL"]) {
    throw new Error("DATABASE_URL env variable is not set. Exiting");
  }
  const SESSION_EXPIRE_PERIOD = Number(process.env["SESSION_EXPIRE_PERIOD"]);
  if (!SESSION_EXPIRE_PERIOD) {
    throw new Error("SESSION_EXPIRE_PERIOD env variable is not set. Exiting");
  }
  admin.initializeApp({
    credential: admin.credential.cert(process.env["SVC_ACCOUNT_FILE"]),
    databaseURL: process.env["DATABASE_URL"],
  });
  const lastAccessDate = new Date();
  lastAccessDate.setDate(lastAccessDate.getDate() - SESSION_EXPIRE_PERIOD);
  const res = await admin
    .firestore()
    .collection("sessions")
    .where("lastAccess", "<=", lastAccessDate)
    .get();

  return Promise.all(
    res.docs.map((doc) =>
      admin
        .firestore()
        .recursiveDelete(doc.ref)
        .then(() => doc.id)
    )
  );
};

console.log(`Starting to delete expired sessions`);
removeExpiredSessions()
  .then((ids) => {
    console.log(`Deleted ${ids.length} expired sessions`);
    console.log(`Sessions deleted: ${ids}`);
  })
  .catch((e: Error) => {
    console.error(e.message);
  });
