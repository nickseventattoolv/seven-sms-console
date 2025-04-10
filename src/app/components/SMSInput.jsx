export default function SMSInput() {
  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 w-full flex justify-center">
      <div className="flex items-center gap-2 bg-black/60 border border-green-500 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg w-[340px] sm:w-[400px]">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow bg-white text-black placeholder-gray-600 outline-none px-3 py-1.5 rounded-lg text-sm font-mono"
        />
        <button
          className="bg-green-500 hover:bg-green-400 text-black font-bold px-4 py-1 rounded-lg shadow-md transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}

