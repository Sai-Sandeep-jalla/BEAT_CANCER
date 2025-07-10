import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://neondb_owner:npg_J2rWGkYw3TPl@ep-round-meadow-ad2bshqw-pooler.c-2.us-east-1.aws.neon.tech/best_cancer?sslmode=require&channel_binding=require",
);
export const db = drizzle(sql, { schema });
