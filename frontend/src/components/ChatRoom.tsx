

export const ChatRoom = () => {

  const onSendMessage = () => {
    // Logic to send message
    console.log("Message sent!");
  }

  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Chat Room</h2>
        <div className="border-t border-gray-200">
          <div className="py-2">
            <div className="mt-4 h-64 overflow-y-auto border border-gray-300 rounded-md p-2">
            </div>
            <input
              type="text"
              placeholder="Type your message..."
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button onClick={() => onSendMessage()}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Send
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
};