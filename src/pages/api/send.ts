import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import { supabase } from '@/utils/supabaseClient';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { phone, message, messageType, senderId } = req.body;

  if (!phone || !message || !messageType || !senderId) {
    return res.status(400).json({ error: 'Missing phone, message type, or user ID' });
  }

  try {
    const result = await client.messages.create({
      to: phone,
      from: twilioNumber,
      body: message,
    });

    await supabase.from('sms_logs').insert([
      {
        phone,
        message_type: messageType,
        sent_by: senderId,
      },
    ]);

    return res.status(200).json({ success: true, sid: result.sid });
  } catch (err: any) {
    console.error('[Twilio Error]', err);
    return res.status(500).json({ error: err.message || 'Failed to send message' });
  }
}

