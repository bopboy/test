const textInput = document.querySelector('#textInput');
const speakButton = document.querySelector('#speakButton');
const stopButton = document.querySelector('#stopButton');
const message = document.querySelector('#message');

const speechSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

const setMessage = (text) => {
  message.textContent = text;
};

const setSpeakingState = (isSpeaking) => {
  speakButton.disabled = isSpeaking;
  stopButton.disabled = !isSpeaking;
};

const speakText = () => {
  const text = textInput.value.trim();

  if (!speechSupported) {
    setMessage('이 브라우저는 음성 읽기 기능을 지원하지 않습니다.');
    return;
  }

  if (!text) {
    setMessage('읽을 문장을 입력해주세요.');
    textInput.focus();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.onstart = () => {
    setSpeakingState(true);
    setMessage('문장을 읽는 중입니다.');
  };

  utterance.onend = () => {
    setSpeakingState(false);
    setMessage('읽기가 완료되었습니다.');
  };

  utterance.onerror = () => {
    setSpeakingState(false);
    setMessage('문장을 읽는 중 문제가 발생했습니다.');
  };

  window.speechSynthesis.speak(utterance);
};

const stopSpeaking = () => {
  if (!speechSupported) {
    return;
  }

  window.speechSynthesis.cancel();
  setSpeakingState(false);
  setMessage('읽기를 정지했습니다.');
};

speakButton.addEventListener('click', speakText);
stopButton.addEventListener('click', stopSpeaking);
setSpeakingState(false);

if (!speechSupported) {
  setMessage('이 브라우저는 음성 읽기 기능을 지원하지 않습니다.');
}
