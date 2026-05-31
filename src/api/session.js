import { api } from './client';

// ---------------------------------------------------------------------------
// Normalize backend exercise → frontend exercise format
// ---------------------------------------------------------------------------
function normalizeExercise(ex) {
  const base = {
    id:          ex.id,
    type:        ex.type,
    tag:         ex.tag,
    question:    ex.question,
    explanation: ex.explanation,
    is_review:   ex.is_review,
  };

  switch (ex.type) {
    case 'multiple-choice':
    case 'odd-one-out':
      return { ...base, options: ex.options, correct: ex.correct_index };

    case 'true-false':
      return { ...base, correct: ex.correct_value };

    case 'image':
      return {
        ...base,
        imageUrl:   ex.image_url,
        imageLabel: ex.image_label,
        imageColor: ex.image_color,
        options:    ex.options,
        correct:    ex.correct_index,
      };

    case 'match':
      return { ...base, pairs: ex.pairs };

    case 'map-click':
      return {
        ...base,
        map_region: ex.map_region,
        hotspots: ex.hotspots.map(h => ({
          id:        h.key,
          label:     h.label,
          longitude: h.longitude,
          latitude:  h.latitude,
          correct:   h.is_correct,
        })),
      };

    case 'chronological':
      return {
        ...base,
        items: ex.items.map(it => ({
          id:    it.key,
          label: it.label,
          year:  it.year,
        })),
      };

    case 'estimation':
      return {
        ...base,
        unit:         ex.unit,
        min:          ex.min_val,
        max:          ex.max_val,
        step:         ex.step,
        defaultValue: ex.default_value,
        correct:      ex.correct_value,
        tolerance:    ex.tolerance,
      };

    default:
      return base;
  }
}

// ---------------------------------------------------------------------------
// Build the answer payload for the backend from frontend answer format
// ---------------------------------------------------------------------------
export function buildAnswerPayload(exerciseId, type, rawAnswer) {
  const payload = { exercise_id: exerciseId, exercise_type: type };

  switch (type) {
    case 'multiple-choice':
    case 'odd-one-out':
      payload.answer = { picked_index: rawAnswer };
      break;
    case 'true-false':
      payload.answer = { picked_value: rawAnswer };
      break;
    case 'image':
      payload.answer = { picked_index: rawAnswer };
      break;
    case 'match':
      // rawAnswer is { leftIndex: rightIndex } map
      payload.answer = {
        left_indices:  Object.keys(rawAnswer).map(Number),
        right_indices: Object.values(rawAnswer).map(Number),
      };
      break;
    case 'map-click':
      // rawAnswer is the hotspot id (= backend key)
      payload.answer = { picked_hotspot_key: rawAnswer };
      break;
    case 'chronological':
      // rawAnswer is array of item ids (= backend keys)
      payload.answer = { submitted_order: rawAnswer };
      break;
    case 'estimation':
      payload.answer = { submitted_value: rawAnswer };
      break;
    default:
      payload.answer = {};
  }
  return payload;
}

// ---------------------------------------------------------------------------
// API calls
// ---------------------------------------------------------------------------
export async function getTodaySession() {
  const data = await api.get('/sessions/today');
  return {
    ...data,
    exercises: data.exercises.map(normalizeExercise),
  };
}

export async function submitAnswer(sessionId, exerciseId, type, rawAnswer, msToAnswer) {
  const body = buildAnswerPayload(exerciseId, type, rawAnswer);
  if (msToAnswer != null) body.ms_to_answer = msToAnswer;
  return api.post(`/sessions/${sessionId}/answers`, body);
}

export async function completeSession(sessionId) {
  return api.post(`/sessions/${sessionId}/complete`, {});
}
