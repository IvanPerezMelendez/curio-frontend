import MultipleChoice  from './MultipleChoice';
import TrueFalse       from './TrueFalse';
import ImageQuestion   from './ImageQuestion';
import Match           from './Match';
import MapClick        from './MapClick';
import Chronological   from './Chronological';
import Estimation      from './Estimation';

export default function ExerciseRouter(props) {
  const t = props.exercise.type;
  if (t === 'multiple-choice' || t === 'odd-one-out') return <MultipleChoice {...props} />;
  if (t === 'true-false')    return <TrueFalse      {...props} />;
  if (t === 'image')         return <ImageQuestion  {...props} />;
  if (t === 'match')         return <Match          {...props} />;
  if (t === 'map-click')     return <MapClick       {...props} />;
  if (t === 'chronological') return <Chronological  {...props} />;
  if (t === 'estimation')    return <Estimation     {...props} />;
  return <div style={{ color: 'red' }}>Tipo desconocido: {t}</div>;
}
