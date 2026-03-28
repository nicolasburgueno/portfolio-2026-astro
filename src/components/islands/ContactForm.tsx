import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// --- Types & Schema ---

interface Translations {
  name: string;
  email: string;
  subject: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  errorName: string;
  errorEmail: string;
  errorSubject: string;
  errorMessage: string;
  confirmTitle: string;
  confirmSubtitle: string;
  confirmTo: string;
  confirmSubjectLabel: string;
  confirmPreview: string;
  confirmCancel: string;
  confirmSend: string;
}

interface ContactFormProps {
  lang?: 'en' | 'es';
  t: Translations;
}

function buildSchema(t: Translations) {
  return z.object({
    name: z.string().min(2, t.errorName),
    email: z.string().email(t.errorEmail),
    subject: z.string().min(3, t.errorSubject),
    message: z.string().min(20, t.errorMessage),
  });
}

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// --- Field component ---

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-xs font-medium tracking-widest uppercase mb-2"
        style={{ color: error ? '#f87171' : 'var(--color-secondary)' }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          className="mt-1.5 text-xs flex items-center gap-1"
          style={{ color: '#f87171' }}
          role="alert"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function getFieldStyle(hasError: boolean): React.CSSProperties {
  return {
    backgroundColor: 'var(--color-bg-darker)',
    border: `1px solid ${hasError ? 'rgba(248,113,113,0.5)' : 'rgba(71,180,204,0.15)'}`,
    color: 'var(--color-text)',
    borderRadius: '8px',
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };
}

// --- Success state ---

function SuccessState({ message }: { message: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 gap-4 text-center"
      style={{ animation: 'fadeSlideUp 0.5s ease forwards' }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(71,180,204,0.1)',
          border: '1px solid rgba(71,180,204,0.3)',
          boxShadow: '0 0 30px rgba(71,180,204,0.15)',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: 'checkDraw 0.5s ease 0.2s both' }}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p
        className="text-lg font-medium"
        style={{ color: 'var(--color-bright)', fontFamily: 'var(--font-sans)' }}
      >
        {message}
      </p>
    </div>
  );
}

// --- Preview Modal ---

interface PreviewModalProps {
  data: FormData;
  t: Translations;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function PreviewModal({ data, t, isLoading, onConfirm, onCancel }: PreviewModalProps) {
  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeSlideUp 0.25s ease forwards',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget && !isLoading) onCancel(); }}
    >
      <div
        style={{
          background: 'var(--color-bg-card, #0f1a1f)',
          border: '1px solid rgba(71,180,204,0.2)',
          borderRadius: '16px',
          padding: '28px',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 40px rgba(71,180,204,0.06)',
        }}
      >
        {/* Header */}
        <div className="mb-5" style={{ textAlign: 'center' }}>
          <h3
            id="preview-modal-title"
            style={{
              margin: 0,
              fontSize: '1.1rem',
              fontWeight: 700,
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-bright)',
              letterSpacing: '-0.02em',
            }}
          >
            {t.confirmTitle}
          </h3>
          <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--color-secondary)' }}>
            {t.confirmSubtitle}
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(71,180,204,0.1)', marginBottom: '20px' }} />

        {/* Fields preview */}
        <div className="flex flex-col gap-4">
          <PreviewRow label={t.confirmTo} value={`${data.name} <${data.email}>`} />
          <PreviewRow label={t.confirmSubjectLabel} value={data.subject} />
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '10px',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(71,180,204,0.5)',
                marginBottom: '6px',
              }}
            >
              {t.confirmPreview}
            </span>
            <div
              style={{
                fontSize: '13px',
                lineHeight: 1.65,
                color: 'var(--color-text)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                padding: '12px 14px',
                maxHeight: '140px',
                overflowY: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {data.message}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '11px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--color-secondary)',
              transition: 'border-color 0.2s, color 0.2s',
              opacity: isLoading ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-secondary)';
            }}
          >
            {t.confirmCancel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              flex: 2,
              padding: '11px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              background: isLoading ? 'rgba(71,180,204,0.4)' : 'var(--color-accent)',
              color: '#0c1219',
              border: 'none',
              boxShadow: isLoading ? 'none' : '0 0 20px rgba(71,180,204,0.3)',
              transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 28px rgba(71,180,204,0.45)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(71,180,204,0.3)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }
            }}
          >
            {isLoading ? (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ animation: 'spin 0.8s linear infinite' }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                {t.sending}
              </>
            ) : (
              t.confirmSend
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span
        style={{
          display: 'block',
          fontSize: '10px',
          fontWeight: 600,
          fontFamily: 'var(--font-sans)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'rgba(71,180,204,0.5)',
          marginBottom: '4px',
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: '13px', color: 'var(--color-text)' }}>{value}</span>
    </div>
  );
}

// --- Main form ---

export default function ContactForm({ t }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const [pendingData, setPendingData] = useState<FormData | null>(null);

  const schema = buildSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Step 1: validation passes → show preview modal
  function onSubmit(data: FormData) {
    setServerError('');
    setPendingData(data);
  }

  // Step 2: user confirms → send to /api/contact
  async function handleConfirm() {
    if (!pendingData) return;
    setIsLoading(true);
    setServerError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingData),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? t.error);
      }

      setPendingData(null);
      setIsSuccess(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : t.error);
      setPendingData(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {
    if (!isLoading) setPendingData(null);
  }

  if (isSuccess) {
    return <SuccessState message={t.success} />;
  }

  const inputBase = (hasError: boolean) => getFieldStyle(hasError);

  const focusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = 'rgba(71,180,204,0.7)';
      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(71,180,204,0.08)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const hasError = e.currentTarget.getAttribute('aria-invalid') === 'true';
      e.currentTarget.style.borderColor = hasError
        ? 'rgba(248,113,113,0.5)'
        : 'rgba(71,180,204,0.15)';
      e.currentTarget.style.boxShadow = 'none';
    },
  };

  return (
    <>
      {pendingData && (
        <PreviewModal
          data={pendingData}
          t={t}
          isLoading={isLoading}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="name" label={t.name} error={errors.name?.message}>
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-invalid={!!errors.name}
              style={inputBase(!!errors.name)}
              {...register('name')}
              {...focusHandlers}
            />
          </Field>

          <Field id="email" label={t.email} error={errors.email?.message}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              style={inputBase(!!errors.email)}
              {...register('email')}
              {...focusHandlers}
            />
          </Field>
        </div>

        {/* Subject */}
        <Field id="subject" label={t.subject} error={errors.subject?.message}>
          <input
            id="subject"
            type="text"
            aria-invalid={!!errors.subject}
            style={inputBase(!!errors.subject)}
            {...register('subject')}
            {...focusHandlers}
          />
        </Field>

        {/* Message */}
        <Field id="message" label={t.message} error={errors.message?.message}>
          <textarea
            id="message"
            rows={5}
            aria-invalid={!!errors.message}
            style={{ ...inputBase(!!errors.message), resize: 'vertical', minHeight: '120px' }}
            {...register('message')}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(71,180,204,0.7)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(71,180,204,0.08)';
            }}
            onBlur={(e) => {
              const hasError = e.currentTarget.getAttribute('aria-invalid') === 'true';
              e.currentTarget.style.borderColor = hasError
                ? 'rgba(248,113,113,0.5)'
                : 'rgba(71,180,204,0.15)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </Field>

        {/* Server error */}
        {serverError && (
          <p
            className="text-sm px-3 py-2 rounded-lg"
            style={{
              color: '#f87171',
              background: 'rgba(248,113,113,0.08)',
              border: '1px solid rgba(248,113,113,0.2)',
            }}
          >
            {serverError}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          style={{
            background: 'var(--color-accent)',
            color: '#0c1219',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 28px',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            letterSpacing: '0.02em',
            transition: 'background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
            boxShadow: '0 0 20px rgba(71,180,204,0.25)',
            alignSelf: 'flex-start',
            minWidth: '160px',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(71,180,204,0.4)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(71,180,204,0.25)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          }}
        >
          {t.send}
        </button>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes checkDraw {
            from { stroke-dashoffset: 30; opacity: 0; }
            to   { stroke-dashoffset: 0; opacity: 1; }
          }
        `}</style>
      </form>
    </>
  );
}
