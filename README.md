# Game steps

1. Modify purecss email layout like index.html
1. Include the Vue library (production)
1. Include your own index.js

---

## Vuejs docs

1. Follow vue.js documentation for hello world; place message in heading up top
1. add id="app" in div tag for heading
1. remove it and instead use el: #layout

---

## Vue devtools

1. Explore console by logging app.whatever
1. Explore console by logging $vm0.whatever
1. Explore Vue Devtools

---

## Display first question

1. Intro to methods
1. Instead of hello world, display 1st quiz question via {{ currentQ().question }}
1. Go to Vue Devtools, increase index by 1

## Intro to lifecycles

1. Move questions inside data:
1. Make sure it still works
1. Intro to lifecycles: mounted

## Intro to v-html template syntax

1. Delete hard coded questions, so it's now `questions: [],`
1. Try using old fashioned fetch to opentdb.com
1. To fix weird characters, [use v-html](https://vuejs.org/v2/guide/syntax.html#Raw-HTML)
1. Mix levels/money with questions object

## Using async/await/fetch

1. create methods function getJSON() and place fetch code in there
1. readjust to make it async/await/fetch

## setup Speech Synthesis to speak question

1. Intro to .find on an array
1. Intro to speechSynthesisUtterance
1. Intro to computed properties
1. Make it speak the current question

## setup Music/Sounds

1. Download .ogg sound files to /sounds
1. Intro to Audio API
1. Intro to computed

## Use default fn params / objects

1. setupMusicSounds(loop=true, vol=0.3)
1. OR setupMusicSounds(config = { loop: true, vol: 0.3 })

## create methods to control music

1. Intro to v-on:click events
1. pause music
1. volume louder
1. volume softer

## make music change based on level/index

1. homework: make method switchMusic() to change music based upon level achieved

## speak answers, shuffle(), hostSpeaksQs

1. Intro to lodash
1. create hostSpeaksQs()
1. create unescape(),
1. create methods unescapedQ/A/B/C/D
1. switch v-html to {{ unescapedQ() }}
1. use unescapedQABCD in hostSpeaksQs

## Display multiple choice options

1. Use <button> and display:flex

## Display side-level/score tracker

1. Intro to v-for
1. Hard code html markup for 1 email
1. map over your questions' level / amount
1. create computed reversedQs
1. Figure out how to display selected class

## setup mouse clicks for a, b, c, d

1. use @click events for all answers
1. create method isAnswerCorrect()
1. create method correctAnswer()

## create gameOver()
