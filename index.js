const money = [
  { level: '1', amount: '100' },
  { level: '2', amount: '200' },
  { level: '3', amount: '300' },
  { level: '4', amount: '500' },
  { level: '5', amount: '1,000' },
  { level: '6', amount: '2,000' },
  { level: '7', amount: '4,000' },
  { level: '8', amount: '8,000' },
  { level: '9', amount: '16,000' },
  { level: '10', amount: '25,000' },
  { level: '11', amount: '50,000' },
  { level: '12', amount: '100,000' },
  { level: '13', amount: '250,000' },
  { level: '14', amount: '500,000' },
  { level: '15', amount: '1,000,000' }
];

const musicRound1 = new Audio('sounds/Round1.ogg');
const musicRound2 = new Audio('sounds/Round2.ogg');
const musicRound3 = new Audio('sounds/Round3.ogg');
const soundAskAudience = new Audio('sounds/AskAudience.ogg');
const soundFifty50 = new Audio('sounds/Fifty50.ogg');
const soundPhoneFriend = new Audio('sounds/PhoneFriend.ogg');
const soundFinalAnswer = new Audio('sounds/FinalAnswer.ogg');
const soundNextQuestion = new Audio('sounds/NextQuestion.ogg');
const soundRightShort = new Audio('sounds/RightAnswerShort.ogg');
const soundWinner = new Audio('sounds/Winner.ogg');
const soundRightAnswer = new Audio('sounds/RightAnswer.ogg');
const soundWrongAnswer = new Audio('sounds/WrongAnswer.ogg');

// instantiate Vue
const app = new Vue({
  el: '#layout',
  async mounted() {
    await this.getJSON();
    this.setupSpeechSynthesis();
    this.setupMusicSounds();
    this.shuffle();
    this.hostSpeaksQs();
  },
  data: {
    index: 0,
    questions: [],
    message: 'hello world',
    host: new SpeechSynthesisUtterance(),
    music: musicRound1,
    rightSound: soundRightShort,
    playOrPaused: '&#9612;&#9612;',
    possibleAnswers: []
  },
  computed: {
    switchMusic() {
      if (this.index === 5) {
        this.music.pause();
        this.music = soundNextQuestion;
        this.music.play();
        this.music.onended = () => {
          this.music = musicRound2;
          this.setupMusicSounds({ vol: 1.0 });
        };
      } else if (this.index === 10) {
        this.music.pause();
        this.music = soundRightAnswer;
        this.music.play();
        this.music.onended = () => {
          this.music = musicRound3;
          this.setupMusicSounds({ vol: 1.0 });
        };
      } else {
        this.rightSound.currentTime = 0;
        this.rightSound.play();
      }
    }
  },
  methods: {
    currentQ() {
      return this.questions[this.index];
    },

    async getJSON() {
      const endpoint =
        'https://opentdb.com/api.php?amount=15&category=18&difficulty=easy&type=multiple';
      const ajaxQs = [];
      let questionsLevelsMoney = [];

      const response = await fetch(endpoint);
      const data = await response.json();

      ajaxQs.push(...data.results);

      questionsLevelsMoney = ajaxQs.map((q, idx) => ({
        level: money[idx].level,
        amount: money[idx].amount,
        ...q
      }));

      this.questions.push(...questionsLevelsMoney);
    },

    // MAKE BROWSER SPEAK SETUP
    setupSpeechSynthesis() {
      this.host.lang = 'en-GB';
      this.host.rate = 1.0;

      this.host.voice = speechSynthesis
        .getVoices()
        .find(voice => voice.name === 'Google UK English Female');
    },

    // MUSIC SETUP
    setupMusicSounds(configMusicObj = {}) {
      const { isLooped = true, vol = 0.3 } = configMusicObj;
      this.music.loop = isLooped;
      this.music.volume = vol;
      this.music.play();
    },

    toggleMusic() {
      if (this.music.paused) {
        this.playOrPaused = '&#9612;&#9612;';
        this.music.play();
        console.info('Music is playing');
      } else {
        this.playOrPaused = '&#9658;';
        this.music.pause();
        console.info('Music is paused');
      }
    },

    louderMusic() {
      this.music.volume += this.music.volume < 0.9 ? 0.1 : 0;
      console.info(`Music volume is ${this.music.volume}`);
    },

    softerMusic() {
      this.music.volume -= this.music.volume > 0.2 ? 0.1 : 0;
      console.info(`Music volume is ${this.music.volume}`);
    },

    // QUESTIONS SETUP
    shuffle() {
      // make one array with all the answers in it
      const tempArr = [
        this.currentQ().correct_answer,
        ...this.currentQ().incorrect_answers
      ];

      // shuffle the array
      const shuffledArr = _.shuffle(tempArr);
      this.possibleAnswers = [...shuffledArr];
    },

    hostSpeaksQs() {
      // check first if user didn't silence the host's voice
      if (this.host) {
        // stop speaking in case it's still speaking
        speechSynthesis.cancel();

        this.host.text = `${this.currentQ().question} Is it,
        A, ${this.possibleAnswers[0]}.
        B, ${this.possibleAnswers[1]}.
        C, ${this.possibleAnswers[2]}.
        or D, ${this.possibleAnswers[3]}.
        `;

        speechSynthesis.speak(this.host);
      }

      console.log(`correct answer is ${this.currentQ().correct_answer}`);
    }
  }
});
