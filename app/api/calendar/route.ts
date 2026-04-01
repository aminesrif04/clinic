import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, service, date, message } = await req.json();

    // Verify Environment Variables
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CALENDAR_ID) {
      return NextResponse.json({ 
        error: "Google Calendar API credentials missing in the .env file." 
      }, { status: 500 });
    }

    // Replace literal '\n' escaping from ENV strings if any
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      undefined,
      privateKey,
      ["https://www.googleapis.com/auth/calendar.events"]
    );

    const calendar = google.calendar({ version: "v3", auth });

    // Ensure the date format is standardized
    // Assumes `date` is YYYY-MM-DD from the HTML input
    const eventStartTime = new Date(`${date}T09:00:00.000Z`); // Default to 9:00 AM (can be improved)
    const eventEndTime = new Date(eventStartTime.getTime() + 60 * 60 * 1000); // 1 hour duration

    const event = {
      summary: `Nouveau RDV : ${service} - ${name}`,
      description: `Demande de RDV depuis la plateforme Web.\n\nNom: ${name}\nTéléphone: ${phone}\nService: ${service}\nMessage/Motif: ${message || 'Aucun'}`,
      start: {
        dateTime: eventStartTime.toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: eventEndTime.toISOString(),
        timeZone: "UTC",
      },
      colorId: "5", // Optional visual coloring
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
    });

    return NextResponse.json({ success: true, link: response.data.htmlLink });

  } catch (error: any) {
    console.error("Google Calendar API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
