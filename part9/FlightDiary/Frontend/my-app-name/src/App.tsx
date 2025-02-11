import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from '../types';
import { getAllDiaries, createDiary } from './diaryService';
import axios from "axios";

const Diarys = ({ diaries }: { diaries: DiaryEntry[] }) => (
  <div>
    <h2>Diaries</h2>
    <ul>
      {diaries.map(diary => (
        <li key={diary.id}>
          <strong>{diary.date}</strong><br />
          Weather: {diary.weather}<br />
          Visibility: {diary.visibility}<br />
          Comment: {diary.comment}
        </li>
      ))}
    </ul>
  </div>
);

const RadioButtonGroup = <T extends string>({ name, options, selectedOption, onChange }: { name: string, options: T[], selectedOption: T, onChange: (value: T) => void }) => (
  <div>
    {options.map(option => (
      <div key={option}>
        <input
          type="radio"
          id={`${name}-${option}`}
          name={name}
          value={option}
          checked={selectedOption === option}
          onChange={() => onChange(option)}
        />
        <label htmlFor={`${name}-${option}`}>{option}</label>
      </div>
    ))}
  </div>
);

const AddDiary = ({ onAdd }: { onAdd: (diary: NewDiaryEntry) => void }) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd({ date, weather, visibility, comment });
    setDate('');
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
    setComment('');
  };

  return (
    <div>
      <h2>Add a new diary entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Weather</label>
          <RadioButtonGroup
            name="weather"
            options={Object.values(Weather)}
            selectedOption={weather}
            onChange={setWeather}
          />
        </div>
        <div>
          <label>Visibility</label>
          <RadioButtonGroup
            name="visibility"
            options={Object.values(Visibility)}
            selectedOption={visibility}
            onChange={setVisibility}
          />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input type="text" id="comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    getAllDiaries().then(diaries => setDiaries(diaries));
  }, []);

  const addDiary = (diary: NewDiaryEntry) => {
    createDiary(diary)
    .then(newDiary => {
      setDiaries(diaries.concat(newDiary));
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error('Error response');
        setError(error.response?.data || 'Unknown Error');
      } else {
        console.error(error);
      }
    });
  };

  return (
    <div>
      <h1>Flight Diary</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <AddDiary onAdd={addDiary} />
      <Diarys diaries={diaries} />
    </div>
  );
}

export default App;