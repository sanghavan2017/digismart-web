interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: any;
}

interface SpeechRecognition extends EventTarget {
  start(): void;
  stop(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  onerror: (() => void) | null;
  lang: string;
  interimResults: boolean;
}

declare var webkitSpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};