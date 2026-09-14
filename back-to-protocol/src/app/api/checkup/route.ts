import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type CheckupRequest = {
  customerName?: string;
  customerEmail?: string;
  subject?: string;
  description?: string;
  service?: "Tech Support" | "Website" | "Business IT" | "Protocol+";
};

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckupRequest;
    const customerName = body.customerName?.trim();
    const customerEmail = body.customerEmail?.trim().toLowerCase();
    const subject = body.subject?.trim();
    const description = body.description?.trim();

    if (!customerName || !customerEmail || !subject || !description) {
      return NextResponse.json({ error: "Name, email, subject, and assessment details are required." }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ error: "Checklist storage is not configured." }, { status: 503 });

    const { data, error } = await supabase.rpc("submit_support_request", {
      customer_name: customerName,
      customer_email: customerEmail,
      request_subject: subject,
      request_description: description,
      request_service: body.service || "Tech Support",
    });

    if (error) {
      console.error("Unable to save technology checkup.", error);
      return NextResponse.json({ error: "Unable to save the technology checkup." }, { status: 502 });
    }

    return NextResponse.json({ ticketNumber: data });
  } catch (error) {
    console.error("Invalid technology checkup submission.", error);
    return NextResponse.json({ error: "Unable to save the technology checkup." }, { status: 400 });
  }
}
