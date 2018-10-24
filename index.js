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

// instantiate Vue
const app = new Vue({
  el: '#layout',
  async mounted() {
    await this.getJSON();
    this.setupSpeechSynthesis();
    this.setupMusicSounds();
  },
  data: {
    index: 0,
    questions: [],
    message: 'hello world',
    host: new SpeechSynthesisUtterance(),
    music: new Audio('sounds/Round1.ogg'),
    playOrPaused: '&#9612;&#9612;'
  },
  computed: {
    switchMusic() {
      if (this.index === 2) {
        this.music.pause();
        this.music = new Audio('sounds/Round2.ogg');
        this.setupMusicSounds({ vol: 1.0 });
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

    setupSpeechSynthesis() {
      this.host.lang = 'en-GB';
      this.host.rate = 1.0;
      this.host.text = this.currentQ().question;

      this.host.voice = speechSynthesis
        .getVoices()
        .find(voice => voice.name === 'Google UK English Female');

      speechSynthesis.speak(this.host);
    },

    setupMusicSounds(configMusicObj = { isLooped: true, vol: 0.3 }) {
      const { isLooped, vol } = configMusicObj;
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
      this.music.volume += 0.1;
      console.info(`Music volume is ${this.music.volume}`);
    },

    softerMusic() {
      this.music.volume -= 0.1;
      console.info(`Music volume is ${this.music.volume}`);
    }
  }
});
