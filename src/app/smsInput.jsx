export default function SMSInput() {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center bg-black/50 border border-green-500 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl w-[360px]">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow bg-transparent text-green-400 placeholder-green-600 outline-none px-2 text-sm"
        />
        <button className="ml-3 px-4 py-1.5 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition-all shadow-md">
          Send
        </button>
      </div>
    </div>
  );
}

