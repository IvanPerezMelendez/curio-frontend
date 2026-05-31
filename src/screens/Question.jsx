import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Island from '../components/Island';
import QuestionHeader from '../components/QuestionHeader';
import ExerciseRouter from '../exercises/ExerciseRouter';
import ChatPanel from '../components/ChatPanel';

export default function Question({ exercise, idx, total, onAnswer, onExit, locked, picked }) {
  const [chatOpen, setChatOpen]     = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  return (
    <div className="session-screen">
      <Island mode="progress" index={idx} total={total} onExit={onExit} />
      <AnimatePresence mode="wait">
        <motion.div
          key={exercise.id}
          className="session-body"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <QuestionHeader tag={exercise.tag} review={exercise.review} question={exercise.question} />
          <ExerciseRouter
            exercise={exercise}
            onAnswer={onAnswer}
            locked={locked}
            picked={picked}
          />
          <div className="chat-trigger-wrap">
            <button className="chat-trigger" onClick={() => setChatOpen(true)}>
              <span>¿Tienes dudas?</span>
              <span className="chat-trigger-icon">✱</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {chatOpen && (
          <ChatPanel
            exercise={exercise}
            messages={chatMessages}
            setMessages={setChatMessages}
            onClose={() => setChatOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
