import React, {useState} from "react";
import {ENGLISH_WORDS} from "./words";
import "./Snowman.css";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";

import {sample} from "lodash";

/** Snowman game: plays hangman-style game with a melting snowman.
 *
 * Props:
 * - maxWrong: how many wrong moves is a player allowed?
 * - images: array of images for wrong guess
 * - words: array of words to pick answer from
 *
 * State:
 * - nWrong: # wrong guesses so far
 * - guessedLetters: set of guessed letters (good and bad) so far
 * - answer: selected secret word*
 */

function Snowman({
  images = [img0, img1, img2, img3, img4, img5, img6],
  words = ENGLISH_WORDS,
  maxWrong = 6,
}) {
  /** by default, allow 6 guesses and use provided gallows images. */

  const [nWrong, setNWrong] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(() => new Set());
  const [answer, setAnswer] = useState(sample(words));

  /** guessedWord: show current-state of word:
   if guessed letters are {a,p,e}, show "app_e" for "apple"
   */
  function guessedWord() {
    return answer.split("").map((ltr) => (guessedLetters.has(ltr) ? ltr : "_"));
  }

  /** handleGuess: handle a guessed letter:
   - add to guessed letters
   - if not in answer, increase number-wrong guesses
   */
  function handleGuess(evt) {
    let ltr = evt.target.value;

    setGuessedLetters((g) => {
      const newGuessed = new Set(g);
      newGuessed.add(ltr);
      return newGuessed;
    });

    setNWrong((n) => n + (answer.includes(ltr) ? 0 : 1));
  }

  let won = !guessedWord().includes("_") ? true : false;

  let hideButtons = nWrong >= maxWrong ? "hidden" : "";

  function resetGame(evt) {
    setAnswer(sample(words));
    setGuessedLetters(new Set());
    setNWrong(0);
  }

  /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={guessedLetters.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  return (
    <div className="Snowman">
      <img src={images[nWrong]} alt={nWrong} />
      <h3>Number Wrong: {nWrong}</h3>
      <p className="Snowman-word">{guessedWord()}</p>
      <p className={`Snowman-buttons ${hideButtons}`}>{generateButtons()}</p>
      <h2>{nWrong >= maxWrong ? `You Lose! The word was "${answer}".` : ""}</h2>
      <h2>{won ? `You won!` : ""}</h2>
      <button onClick={resetGame} className="Snowman-restart">
        Restart!
      </button>
    </div>
  );
}

export default Snowman;
