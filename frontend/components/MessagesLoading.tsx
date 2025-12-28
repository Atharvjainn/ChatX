import React from 'react';

const MessagesLoading: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4 px-6">
      {/* Typing / loading bubbles */}
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>

      <p className="text-sm text-gray-400">
        Loading messages…
      </p>
    </div>
  );
};

export default MessagesLoading;
