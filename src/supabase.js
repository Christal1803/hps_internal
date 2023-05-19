import { createClient } from "@supabase/supabase-js";

   //supabase credentials jv
  const supabaseUrl = "https://zqydhjfofwxhvbagfwpg.supabase.co";
  const supabaseKey =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxeWRoamZvZnd4aHZiYWdmd3BnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MzIwNjY1MiwiZXhwIjoxOTg4NzgyNjUyfQ.3xA7iglBkdpc1AHlnUEHUFz7GhlViqdrprxWO7W4ZTU";

 //supabase credentials stagging

// const supabaseUrl = "https://ijivowreuehnyevjwztg.supabase.co";
// const supabaseKey =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqaXZvd3JldWVobnlldmp3enRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2MzAyMzYsImV4cCI6MTk5OTIwNjIzNn0.VwCQjh0xHQys9oCcOdw8Go5lMNOxp-VbKIVzyuShN1w";

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase }