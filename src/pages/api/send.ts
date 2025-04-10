import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient'; // ✅ fixed relative path
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER!;
const client = twilio(accountSid, authToken);

const messages: { [key: string]: string } = {
  'Appointment Reminder': 'Hi, this is Seven Tattoo Studio. Just a reminder about your upcoming appointment tomorrow. Text us if you have any questions!',
  'Healing Follow-up': 'Hi, this is Seven Tattoo Studio. We hope you loved your tattoo! If you have any healing questions, feel free to reach out.',
  'We Miss You': 'Hi, this is Seven Tattoo Studio. It’s been a while! If you’re thinking about your next piece, we’d love to help.',
  'Thank You': 'Hi, this is Seven Tattoo Studio. Thank you again for trusting us with your tattoo!',
  'Confirmation': 'Hi, this is Seven Tattoo Studio. Your appointment has been confirmed. Let us know if anything changes!',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { phone, type, userId } = req.body;

  const body = messages[type];
  if (!phone || !body || !userId) {
    return res.status(400).json({ success: false, error: 'Missing phone, message type, or user ID' });
  }

  try {
    // ✅ Send SMS with Twilio
    await client.messages.create({
      to: phone,
      from: twilioPhone,
      body,
    });

    // ✅ Log to Supabase
    const { error } = await supabase.from('sms_logs').insert([
      {
        phone,
        message_type: type,
        sent_by: userId,
      },
    ]);

    if (error) {
      console.error('❌ Supabase log error:', error.message);
      return res.status(500).json({ success: false, error: 'Failed to log SMS' });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('❌ Twilio error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}

