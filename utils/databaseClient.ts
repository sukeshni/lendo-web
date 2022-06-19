import { createClient } from "@supabase/supabase-js";

export const getDatabaseClient = () => {
  const databaseUrl = "https://xawbonnzaclulkqelzgf.supabase.co";
  const tableName = "loan_applications";
  const dbApiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhd2Jvbm56YWNsdWxrcWVsemdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUzMzIwNzcsImV4cCI6MTk3MDkwODA3N30.8C6AzzBQGJ8RX3dTcAqITziQqVxp7-9jF1iiOcgW4p4";

  let supabase: any = null;

  const init = () => {
    if (!supabase) {
      // Create a single supabase client for interacting with your database
      console.log("initialising supabase");
      supabase = createClient(databaseUrl, dbApiKey);
    }
  };

  const insert = async (data: any) => {
    return await supabase.from(tableName).insert([data]);
  };

  const select = async (arr: any) => {
    if(arr[0] && arr[1]) {
      return await supabase.from(tableName).select().eq(arr[0], arr[1]);
    } else {
      return await supabase.from(tableName).select();
    }
    
  };

  const update = async (data: any, match: any) => {
    return await supabase.from(tableName).update(data).match(match);
  };

  init();
  return { select, insert, update };
};
