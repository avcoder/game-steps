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

const musicTheme = new Audio('sounds/Theme.mp3');

const musicRound1 = new Audio('sounds/Round1.ogg');
musicRound1.loop = true;
musicRound1.volume = 0.5;

// const musicRound2 = new Audio('sounds/Round2.ogg');
// const musicRound3 = new Audio('sounds/Round3.ogg');
// const soundAskAudience = new Audio('sounds/AskAudience.ogg');
// const soundFifty50 = new Audio('sounds/Fifty50.ogg');
// const soundPhoneFriend = new Audio('sounds/PhoneFriend.ogg');
// const soundFinalAnswer = new Audio('sounds/FinalAnswer.ogg');
const soundNextQuestion = new Audio('sounds/NextQuestion.ogg');
const soundRightShort = new Audio('sounds/RightAnswerShort.ogg');
// const soundWinner = new Audio('sounds/Winner.ogg');
// const soundRightAnswer = new Audio('sounds/RightAnswer.ogg');
const soundWrongAnswer = new Audio('sounds/WrongAnswer.ogg');

const app = new Vue({
  el: '#layout',
  mounted() {
    this.getTriviaQs();
    this.setupSpeechSynthesis();

    // set up key event listeners
    window.addEventListener('keydown', this.clickButton);
  },
  data: {
    questions: [],
    index: 0,
    shuffledArray: [],
    items: money.reverse(),
    music: musicTheme,
    isPlaying: false,
    host: new SpeechSynthesisUtterance()
  },
  filters: {
    unescape(value) {
      return _.unescape(value).replace(/&#039;/gi, "'");
    }
  },
  watch: {
    index() {
      // help us debug by console logging the correct answer
      console.log(this.currentQ().correct_answer);
      this.shuffle();
    }
  },
  methods: {
    currentQ() {
      return this.questions[this.index];
    },
    possibleAnswers(idx) {
      return this.shuffledArray[idx];
    },
    shuffle() {
      // we want to create an array that contains both correct and incorrect answers
      const tempArr = [
        this.currentQ().correct_answer,
        ...this.currentQ().incorrect_answers
      ];

      // we want to shuffle it.
      this.shuffledArray = _.shuffle(tempArr);
    },
    async getTriviaQs() {
      const response = await fetch('https://opentdb.com/api.php?amount=15&category=18&type=multiple');
      const data = await response.json();
      this.questions = data.results;
      this.shuffle();
      console.log(this.currentQ().correct_answer);
      this.music.play();
    },
    isAnswerCorrect(e) {
      // let's decide by looking at the button's data-index
      ({ index } = e.target.dataset);

      // then we'll use that index to refer to inside our shuffledArray
      // so we can get the string of that shuffledArray[index]
      const selectedAnswer = this.shuffledArray[index];

      // compare string to our correctAnswer found in currentQ()
      if (selectedAnswer === this.currentQ().correct_answer) {
        if (this.index < 14) {
          this.index += 1;
          soundRightShort.play();
          this.hostSpeaksQs();
        } else {
          this.youWin();
        }
      } else {
        this.gameOver();
      }
    },
    youWin() {
      console.log('winner!');
    },
    gameOver() {
      this.music.pause();
      soundWrongAnswer.play();
    },
    beginRoundMusic() {
      // this is like a music manager determining which music to play based on current level
      this.music.pause();

      // if this is the very beginning, then play
      soundNextQuestion.play();
      soundNextQuestion.onended = () => {
        this.music = musicRound1;
        this.music.play();
      };
    },
    beginPlay() {
      this.isPlaying = true;
      this.beginRoundMusic();
      setTimeout(() => {
        this.hostSpeaksQs();
      }, 2000);
    },
    clickButton(e) {
      // if user presses the keys A, B, C, or D, then act as if they clicked the button
      const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
      console.log(key);
      if (!key) return; // captures anything other than a, b, c, d
      key.click();
    },
    setupSpeechSynthesis() {
      this.host.lang = 'en-GB';
      this.host.rate = 1.0;

      this.host.voice = speechSynthesis
        .getVoices()
        .find(voice => voice.name === 'Google UK English Female');
    },
    hostSpeaksQs() {
      if (this.host) {
        // stop speaking in case it's still speaking
        speechSynthesis.cancel();

        this.host.text = `${this.currentQ().question} Is it,
        A, ${this.shuffledArray[0]}.
        B, ${this.shuffledArray[1]}.
        C, ${this.shuffledArray[2]}.
        or D, ${this.shuffledArray[3]}.
        `;

        speechSynthesis.speak(this.host);
      }
    }
  }
});
