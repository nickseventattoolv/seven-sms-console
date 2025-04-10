import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient'; // relative path
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER!;
const client = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { phone, message, messageType, userId } = req.body;

  if (!phone || !message || !messageType || !userId) {
    return res.status(400).json({ success: false, error: 'Missing phone, message type, message, or user ID' });
  }

  try {
    // ✅ Send SMS via Twilio
    await client.messages.create({
      to: phone,
      from: twilioPhone,
      body: message,
    });

    // ✅ Log SMS to Supabase
    const { error } = await supabase.from('sms_logs').insert([
      {
        phone,
        message_type: messageType,
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

