import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER!;
const client = twilio(accountSid, authToken);

const messages: { [key: string]: string } = {
  'Appointment Reminder': 'Hi, this is Seven Tattoo Studio. Just a reminder about your upcoming appointment tomorrow. Text us if you have any questions!',
  'Healing Follow-up': 'Hi, this is Seven Tattoo Studio. We hope you loved your tattoo! If you have any healing questions, feel free to reach out.',
  'Thank You': 'Thank you for choosing Seven Tattoo Studio! We appreciate your trust in our artists.',
  'Confirmation': 'Your appointment with Seven Tattoo Studio has been confirmed. We look forward to seeing you soon!'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { phone, type, user_id } = req.body;

  if (!messages[type]) {
    return res.status(400).json({ success: false, error: 'Invalid message type' });
  }

  try {
    await client.messages.create({
      to: phone,
      from: twilioPhone,
      body: messages[type]
    });

    await supabase.from('sms_logs').insert([
      {
        phone,
        message_type: type,
        sent_by: user_id
      }
    ]);

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Twilio error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
}
