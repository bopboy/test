const textInput = document.querySelector('#textInput');
const speakButton = document.querySelector('#speakButton');
const stopButton = document.querySelector('#stopButton');
const message = document.querySelector('#message');
const aiVoiceSelect = document.querySelector('#aiVoiceSelect');
const meVoiceSelect = document.querySelector('#meVoiceSelect');
const aiPitchInput = document.querySelector('#aiPitchInput');
const mePitchInput = document.querySelector('#mePitchInput');
const aiPitchValue = document.querySelector('#aiPitchValue');
const mePitchValue = document.querySelector('#mePitchValue');
const rateInput = document.querySelector('#rateInput');
const rateValue = document.querySelector('#rateValue');
const dialoguePreview = document.querySelector('#dialoguePreview');

const speechSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
const speakerPattern = /^(ai|me)\s*[:：]\s*(.+)$/i;

let voices = [];
let activeQueue = [];
let activeIndex = 0;
let isStopping = false;

const setMessage = (text) => {
  message.textContent = text;
};

const setSpeakingState = (isSpeaking) => {
  speakButton.disabled = isSpeaking;
  stopButton.disabled = !isSpeaking;
};

const formatNumber = (value) => Number.parseFloat(value).toFixed(2);

const updateRangeLabels = () => {
  aiPitchValue.textContent = formatNumber(aiPitchInput.value);
  mePitchValue.textContent = formatNumber(mePitchInput.value);
  rateValue.textContent = formatNumber(rateInput.value);
};

const parseDialogue = (text) => text
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const match = line.match(speakerPattern);

    if (!match) {
      return {
        speaker: 'me',
        text: line,
      };
    }

    return {
      speaker: match[1].toLowerCase(),
      text: match[2].trim(),
    };
  })
  .filter((item) => item.text);

const renderPreview = () => {
  const dialogue = parseDialogue(textInput.value);
  dialoguePreview.innerHTML = '';

  dialogue.forEach((item) => {
    const listItem = document.createElement('li');
    const speaker = document.createElement('span');
    const text = document.createElement('span');

    speaker.className = `speaker speaker-${item.speaker}`;
    speaker.textContent = item.speaker;
    text.textContent = item.text;

    listItem.append(speaker, text);
    dialoguePreview.append(listItem);
  });
};

const getKoreanVoices = () => voices.filter((voice) => voice.lang.toLowerCase().startsWith('ko'));

const getVoiceLabel = (voice) => `${voice.name} (${voice.lang})${voice.default ? ' · 기본' : ''}`;

const fillVoiceSelect = (select, preferredIndex) => {
  select.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = '브라우저 기본 음성';
  select.append(defaultOption);

  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = getVoiceLabel(voice);
    select.append(option);
  });

  if (voices[preferredIndex]) {
    select.value = String(preferredIndex);
  }
};

const loadVoices = () => {
  if (!speechSupported) {
    return;
  }

  voices = window.speechSynthesis.getVoices();
  const koreanVoices = getKoreanVoices();
  const aiVoice = koreanVoices[0] ?? voices[0];
  const meVoice = koreanVoices.find((voice) => voice.name !== aiVoice?.name) ?? koreanVoices[1] ?? voices[1] ?? voices[0];
  const aiIndex = voices.indexOf(aiVoice);
  const meIndex = voices.indexOf(meVoice);

  fillVoiceSelect(aiVoiceSelect, aiIndex);
  fillVoiceSelect(meVoiceSelect, meIndex);

  if (!voices.length) {
    setMessage('음성 목록을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
  }
};

const getSpeakerSettings = (speaker) => {
  const isAi = speaker === 'ai';
  const voiceSelect = isAi ? aiVoiceSelect : meVoiceSelect;
  const pitchInput = isAi ? aiPitchInput : mePitchInput;
  const selectedVoice = voices[Number(voiceSelect.value)];

  return {
    voice: selectedVoice,
    pitch: Number.parseFloat(pitchInput.value),
    rate: Number.parseFloat(rateInput.value),
  };
};

const speakQueueItem = () => {
  if (isStopping || activeIndex >= activeQueue.length) {
    setSpeakingState(false);
    activeQueue = [];
    activeIndex = 0;

    if (!isStopping) {
      setMessage('대화 읽기가 완료되었습니다.');
    }

    return;
  }

  const item = activeQueue[activeIndex];
  const settings = getSpeakerSettings(item.speaker);
  const utterance = new SpeechSynthesisUtterance(item.text);

  utterance.lang = settings.voice?.lang || 'ko-KR';
  utterance.voice = settings.voice || null;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.volume = 1;

  utterance.onstart = () => {
    setMessage(`${activeIndex + 1}/${activeQueue.length} · ${item.speaker} 목소리로 읽는 중입니다.`);
  };

  utterance.onend = () => {
    activeIndex += 1;
    speakQueueItem();
  };

  utterance.onerror = () => {
    setSpeakingState(false);
    setMessage('대화를 읽는 중 문제가 발생했습니다.');
  };

  window.speechSynthesis.speak(utterance);
};

const speakText = () => {
  const dialogue = parseDialogue(textInput.value);

  if (!speechSupported) {
    setMessage('이 브라우저는 음성 읽기 기능을 지원하지 않습니다.');
    return;
  }

  if (!dialogue.length) {
    setMessage('읽을 대화를 입력해주세요. 예: ai: 안녕하세요.');
    textInput.focus();
    return;
  }

  window.speechSynthesis.cancel();
  activeQueue = dialogue;
  activeIndex = 0;
  isStopping = false;
  setSpeakingState(true);
  speakQueueItem();
};

const stopSpeaking = () => {
  if (!speechSupported) {
    return;
  }

  isStopping = true;
  window.speechSynthesis.cancel();
  activeQueue = [];
  activeIndex = 0;
  setSpeakingState(false);
  setMessage('대화 읽기를 정지했습니다.');
};

textInput.addEventListener('input', renderPreview);
speakButton.addEventListener('click', speakText);
stopButton.addEventListener('click', stopSpeaking);
aiPitchInput.addEventListener('input', updateRangeLabels);
mePitchInput.addEventListener('input', updateRangeLabels);
rateInput.addEventListener('input', updateRangeLabels);

setSpeakingState(false);
updateRangeLabels();
renderPreview();

if (!speechSupported) {
  setMessage('이 브라우저는 음성 읽기 기능을 지원하지 않습니다.');
} else {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
