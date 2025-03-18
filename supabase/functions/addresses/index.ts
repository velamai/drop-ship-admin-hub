
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

// Set up CORS headers for the function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Create a Supabase client with the URL and anon key
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  // Get the request path and method
  const url = new URL(req.url);
  const path = url.pathname.split("/").pop(); // Get the last part of the path
  
  try {
    console.log(`Processing ${req.method} request for path: ${url.pathname}`);
    
    // GET - List all addresses
    if (req.method === "GET" && !path) {
      console.log("Fetching all addresses");
      const { data, error } = await supabase
        .from("addresses")
        .select("*");

      if (error) {
        console.error("Error fetching addresses:", error);
        throw error;
      }

      // Map the results to the expected format
      const formattedAddresses = data.map(item => ({
        id: item.id,
        addressLine1: item.address_line1,
        addressLine2: item.address_line2 || undefined,
        city: item.city,
        state: item.state || undefined,
        postalCode: item.postal_code,
        country: item.country,
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }));

      return new Response(JSON.stringify(formattedAddresses), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // POST - Create a new address
    if (req.method === "POST") {
      const addressData = await req.json();
      console.log("Creating new address:", addressData);

      // Convert from frontend format to database format
      const dbAddress = {
        address_line1: addressData.addressLine1,
        address_line2: addressData.addressLine2,
        city: addressData.city,
        state: addressData.state,
        postal_code: addressData.postalCode,
        country: addressData.country,
      };

      // Perform validation
      if (!dbAddress.address_line1 || !dbAddress.city || !dbAddress.postal_code || !dbAddress.country) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      // Insert the address and return the result
      const { data, error } = await supabase
        .from("addresses")
        .insert(dbAddress)
        .select();

      if (error) {
        console.error("Error inserting address:", error);
        throw error;
      }

      // Map the result back to the frontend format
      const formattedAddress = {
        id: data[0].id,
        addressLine1: data[0].address_line1,
        addressLine2: data[0].address_line2 || undefined,
        city: data[0].city,
        state: data[0].state || undefined,
        postalCode: data[0].postal_code,
        country: data[0].country,
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at
      };

      return new Response(JSON.stringify(formattedAddress), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 201,
      });
    }

    // PUT - Update an existing address
    if (req.method === "PUT" && path) {
      const id = path;
      const addressData = await req.json();
      console.log(`Updating address ${id}:`, addressData);

      // Convert from frontend format to database format
      const dbAddress = {
        address_line1: addressData.addressLine1,
        address_line2: addressData.addressLine2,
        city: addressData.city,
        state: addressData.state,
        postal_code: addressData.postalCode,
        country: addressData.country,
      };

      // Perform validation
      if (!dbAddress.address_line1 || !dbAddress.city || !dbAddress.postal_code || !dbAddress.country) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      // Update the address
      const { error } = await supabase
        .from("addresses")
        .update(dbAddress)
        .eq("id", id);

      if (error) {
        console.error("Error updating address:", error);
        throw error;
      }

      // Get the updated address
      const { data: updatedData, error: fetchError } = await supabase
        .from("addresses")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Error fetching updated address:", fetchError);
        throw fetchError;
      }

      // Map the result back to the frontend format
      const formattedAddress = {
        id: updatedData.id,
        addressLine1: updatedData.address_line1,
        addressLine2: updatedData.address_line2 || undefined,
        city: updatedData.city,
        state: updatedData.state || undefined,
        postalCode: updatedData.postal_code,
        country: updatedData.country,
        createdAt: updatedData.created_at,
        updatedAt: updatedData.updated_at
      };

      return new Response(JSON.stringify(formattedAddress), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // DELETE - Delete an address
    if (req.method === "DELETE" && path) {
      const id = path;
      console.log(`Deleting address ${id}`);

      const { error } = await supabase
        .from("addresses")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting address:", error);
        throw error;
      }

      return new Response(JSON.stringify({ success: true, id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // If we reach here, the requested method is not supported
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });

  } catch (error) {
    console.error("Error in addresses function:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
