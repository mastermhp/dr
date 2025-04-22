"use client"

import { Mic, Volume2 } from "lucide-react"

export default function VoiceInterface({
  talking,
  setTalking,
  listening,
  setListening,
  transcript,
  setTranscript,
  response,
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pointer-events-none">
      <div className="bg-black/70 backdrop-blur-md border border-pink-500/30 rounded-xl p-3 mx-auto max-w-xs pointer-events-auto">
        <div className="mb-3">
          <h3 className="text-sm font-bold text-white mb-1 gradient-text">AI Digital Replica</h3>
          <div className="h-12 overflow-y-auto bg-gray-900/50 rounded-lg p-2 mb-2 border border-pink-500/20 text-xs">
            <p className="text-gray-300">{response}</p>
          </div>
          <div className="h-12 overflow-y-auto bg-gray-900/50 rounded-lg p-2 border border-pink-500/20 text-xs">
            <p className="text-gray-400">{transcript || "Your speech will appear here..."}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              setListening(true)
              setTranscript("")
            }}
            disabled={listening}
            className={`px-3 py-1 rounded-lg flex items-center text-xs ${
              listening ? "bg-pink-500/50 text-white cursor-not-allowed" : "bg-pink-500 text-white hover:bg-pink-600"
            }`}
          >
            <Mic size={14} className="mr-1" />
            {listening ? "Listening..." : "Listen"}
          </button>

          <button
            onClick={() => {
              setTalking(true)
            }}
            disabled={talking}
            className={`px-3 py-1 rounded-lg flex items-center text-xs ${
              talking
                ? "bg-purple-500/50 text-white cursor-not-allowed"
                : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            <Volume2 size={14} className="mr-1" />
            {talking ? "Speaking..." : "Speak"}
          </button>
        </div>
      </div>
    </div>
  )
}
