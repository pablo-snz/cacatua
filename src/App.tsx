import { Mode, Chord } from "tonal";
import * as Tone from "tone";

type ChordType = {
  name: string;
  tonic: string | null;
  notes: string[];
};

const generateChords = (octave: string): ChordType[] => {
  const triadsNames: string[] = Mode.triads("major", "C");
  const seventhNames: string[] = Mode.seventhChords("major", "C");
  const chordsNames: string[] = [...triadsNames, ...seventhNames];

  const chordsWithOctave: ChordType[] = chordsNames.map((chordName: string) => {
    const chord = Chord.get(chordName);
    const chordWithOctave = Chord.getChord(
      chord.aliases[0],
      chord.tonic + octave
    );
    const chordType: ChordType = {
      name: chordName,
      tonic: chordWithOctave.tonic,
      notes: chordWithOctave.notes,
    };
    return chordType;
  });

  return chordsWithOctave;
};

const playChord = (piano: Tone.PolySynth, notes: string[]) => {
  piano.triggerAttackRelease(notes, "1s");
};

function App() {
  const piano = new Tone.PolySynth().toDestination();
  const chords: ChordType[] = generateChords("4");

  return (
    <>
      <h1>C Chords</h1>
      <div>
        {chords.map((chord: ChordType, index: number) => (
          <button
            key={index}
            onClick={() => {
              Tone.start().then(() => {
                playChord(piano, chord.notes);
              });
            }}
          >
            {chord.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;

