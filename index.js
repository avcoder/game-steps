const questions = [
  {
    category: 'Entertainment: Comics',
    type: 'multiple',
    difficulty: 'easy',
    question: 'Who is Batman?',
    correct_answer: 'Bruce Wayne',
    incorrect_answers: ['Clark Kent', 'Barry Allen', 'Tony Stark']
  },
  {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'Which popular First Person Shooter (FPS) franchise, got a Real Time Strategy (RTS) game developed based on its universe?',
    correct_answer: 'Halo',
    incorrect_answers: ['Battlefield', 'Call of Duty', 'Borderlands']
  },
  {
    category: 'Entertainment: Board Games',
    type: 'multiple',
    difficulty: 'easy',
    question: 'How many dots are on a single die?',
    correct_answer: '21',
    incorrect_answers: ['24', '15', '18']
  }
];

const money = [
  { level: '15', amount: '1,000,000' },
  { level: '14', amount: '500,000' },
  { level: '13', amount: '250,000' },
  { level: '12', amount: '100,000' },
  { level: '11', amount: '50,000' },
  { level: '10', amount: '25,000' },
  { level: '9', amount: '16,000' },
  { level: '8', amount: '8,000' },
  { level: '7', amount: '4,000' },
  { level: '6', amount: '2,000' },
  { level: '5', amount: '1,000' },
  { level: '4', amount: '500' },
  { level: '3', amount: '300' },
  { level: '2', amount: '200' },
  { level: '1', amount: '100' }
];

// instantiate Vue
const app = new Vue({
  el: '#layout',
  data: {
    index: 0,
    questions,
    message: 'hello world'
  }
});
