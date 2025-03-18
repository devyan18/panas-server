import { connect } from "mongoose";

export const startConnectionDb = async (uri: string): Promise<void> => {
  try {
    const db = await connect(uri);
    console.log(`Start connection in ${db.connection.db?.databaseName}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
