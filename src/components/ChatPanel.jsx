import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { sendChatMessage } from '../api/chat';

export default function ChatPanel({ exercise, messages, setMessages, onClose }) {
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg  = { role: 'user', content: text };
    const history  = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);

    try {
      const { reply } = await sendChatMessage(exercise, history);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'No pude conectar con el tutor. Inténtalo de nuevo.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <motion.div
      className="chat-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="chat-backdrop" onClick={onClose} />

      <motion.div
        className="chat-panel"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
      >
        <div className="chat-head">
          <div className="chat-head-title">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>✱</span>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.05rem' }}>Tutor</span>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="chat-empty">Pregúntame lo que quieras sobre este ejercicio.</div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={'chat-msg ' + (m.role === 'user' ? 'chat-msg-user' : 'chat-msg-ai')}>
              {m.content}
            </div>
          ))}
          {loading && <div className="chat-msg chat-msg-ai chat-loading">···</div>}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input-row">
          <input
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Escribe tu pregunta…"
            autoFocus
            disabled={loading}
          />
          <button
            className="chat-send"
            onClick={send}
            disabled={loading || !input.trim()}
          >
            ↑
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
