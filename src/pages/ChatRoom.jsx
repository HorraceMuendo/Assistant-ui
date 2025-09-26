export default function ChatRoom() {
  return (
    <div className="p-4 h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto bg-base-200 p-4 rounded-lg">
        {/* Chat messages will go here */}
      </div>
      <div className="mt-4 flex">
        <input type="text" placeholder="Type a message..." className="input input-bordered flex-1 mr-2" />
        <button className="btn btn-primary">Send</button>
      </div>
    </div>
  );
}
