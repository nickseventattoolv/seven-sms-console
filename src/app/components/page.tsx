'use client';

import Matrix from './components/Matrix';
import SMSInput from './components/SMSInput';

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
      {/* ✅ Matrix background */}
      <div className="absolute inset-0 -z-10">
        <Matrix />
      </div>

      {/* ✅ White box container */}
      <div className="z-10 bg-white text-black rounded-2xl shadow-2xl px-6 py-8 w-[360px] sm:w-[420px] text-center space-y-6">
        <h1 className="text-2xl font-bold">
          Seven Tattoo Studio – SMS Console
        </h1>

        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500"
        />

        <button className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-2 rounded-lg transition-all">
          Send
        </button>

        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
          <option>Appointment Reminder</option>
          <option>Healing Follow-up</option>
          <option>We Miss You</option>
        </select>
      </div>
    </div>
  );
}

