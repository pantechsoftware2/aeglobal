"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Check, Clock3, LoaderCircle, ShieldCheck, Sparkles, X } from "lucide-react";

type LeadFormData = {
  name: string;
  email: string;
  phone: string;
  country: string;
  course: string;
  intake: string;
  message: string;
};

type LeadEnquiryProps = {
  className: string;
  children: ReactNode;
  country?: string;
  institution?: string;
};

const initialForm: LeadFormData = {
  name: "",
  email: "",
  phone: "",
  country: "",
  course: "",
  intake: "",
  message: ""
};

const limits: Record<keyof LeadFormData, number> = {
  name: 100,
  email: 160,
  phone: 30,
  country: 100,
  course: 160,
  intake: 80,
  message: 1200
};

function validate(form: LeadFormData) {
  const errors: Partial<Record<keyof LeadFormData, string>> = {};
  const trimmed = Object.fromEntries(
    Object.entries(form).map(([key, value]) => [key, value.trim()])
  ) as LeadFormData;

  if (!trimmed.name) errors.name = "Please enter your full name.";
  if (!trimmed.email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!trimmed.phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^[+()\d][\d\s().-]{6,28}$/.test(trimmed.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  (Object.keys(limits) as Array<keyof LeadFormData>).forEach((field) => {
    if (trimmed[field].length > limits[field]) {
      errors[field] = `Please keep this under ${limits[field]} characters.`;
    }
  });

  return { errors, trimmed };
}

export default function LeadEnquiry({ className, children, country, institution }: LeadEnquiryProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "submitting") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, status]);

  const updateField = (field: keyof LeadFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "idle") setStatus("idle");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validate(form);
    setForm(result.trimmed);
    setErrors(result.errors);
    if (Object.keys(result.errors).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.trimmed)
      });
      if (!response.ok) throw new Error("Lead submission failed");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  const modal = open && typeof document !== "undefined" ? createPortal(
    <div className="lead-modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget && status !== "submitting") setOpen(false);
    }}>
      <section className="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title" aria-describedby="lead-modal-description">
        <button ref={closeButtonRef} type="button" className="lead-modal-close" onClick={() => setOpen(false)} disabled={status === "submitting"} aria-label="Close enquiry form">
          <X size={19} aria-hidden="true" />
        </button>

        <div className="lead-modal-intro">
          <div>
            <p className="lead-modal-kicker"><Sparkles size={14} aria-hidden="true" /> Personal study guidance</p>
            <h2 id="lead-modal-title">Let&apos;s shape your next move.</h2>
            <p id="lead-modal-description">Tell us what you&apos;re considering. An AE Global advisor will help you turn it into a clear, practical shortlist.</p>
          </div>
          <div className="lead-modal-benefits" aria-label="What to expect">
            <span><Clock3 size={17} aria-hidden="true" /><strong>Quick to complete</strong><small>Usually under two minutes</small></span>
            <span><ShieldCheck size={17} aria-hidden="true" /><strong>Private and secure</strong><small>Your details stay with our team</small></span>
          </div>
        </div>

        <div className="lead-modal-content">
          {status === "success" ? (
            <div className="lead-success" role="status">
              <span><Check size={25} aria-hidden="true" /></span>
              <p className="lead-success-kicker">Enquiry received</p>
              <h3>Thank you!</h3>
              <p>Your details are with our advisory team. We&apos;ll be in touch shortly to discuss your next step.</p>
              <button type="button" className="teal-button" onClick={() => setOpen(false)}>Done</button>
            </div>
          ) : (
            <>
              <div className="lead-form-heading">
                <div><span>Enquiry details</span><p>Start with the essentials—we&apos;ll discuss the rest together.</p></div>
                <small><em>*</em> Required</small>
              </div>
              <form className="lead-form" onSubmit={submit} noValidate>
                <div className="lead-form-grid">
                  <LeadField label="Full name" name="name" value={form.name} onChange={updateField} error={errors.name} placeholder="Your full name" autoComplete="name" required />
                  <LeadField label="Email address" name="email" type="email" value={form.email} onChange={updateField} error={errors.email} placeholder="you@example.com" autoComplete="email" required />
                  <LeadField label="Phone number" name="phone" type="tel" value={form.phone} onChange={updateField} error={errors.phone} placeholder="Include country code" autoComplete="tel" required />
                  <LeadField label="Study destination" name="country" value={form.country} onChange={updateField} error={errors.country} placeholder="Country you are considering" autoComplete="country-name" />
                  <LeadField label="Course or programme" name="course" value={form.course} onChange={updateField} error={errors.course} placeholder="e.g. MSc Data Science" />
                  <LeadField label="Preferred intake" name="intake" value={form.intake} onChange={updateField} error={errors.intake} placeholder="e.g. September 2027" />
                </div>
                <label className="lead-field lead-field-full">
                  <span>Anything else we should know?</span>
                  <textarea name="message" value={form.message} maxLength={limits.message} placeholder="Tell us about your goals, qualifications or questions (optional)" onChange={(event) => updateField("message", event.target.value)} aria-invalid={Boolean(errors.message)} />
                  {errors.message && <small className="lead-field-error">{errors.message}</small>}
                </label>
                {status === "error" && <p className="lead-submit-error" role="alert">We couldn&apos;t send your enquiry. Please try again.</p>}
                <div className="lead-form-footer">
                  <p><ShieldCheck size={14} aria-hidden="true" /> Full name, email address and phone number are required.</p>
                  <button className="teal-button lead-submit" type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? <><LoaderCircle className="lead-submit-spinner" size={17} aria-hidden="true" /> Sending</> : <>Send enquiry <ArrowRight size={17} aria-hidden="true" /></>}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <button type="button" className={className} onClick={() => {
        setForm((current) => ({ ...current, ...(country ? { country } : {}), ...(institution ? { message: `I would like to enquire about ${institution}.` } : {}) }));
        setOpen(true);
        setStatus("idle");
      }}>
        {children}
      </button>
      {modal}
    </>
  );
}

function LeadField({ label, name, type = "text", value, onChange, error, required = false, placeholder, autoComplete }: {
  label: string;
  name: keyof LeadFormData;
  type?: string;
  value: string;
  onChange: (field: keyof LeadFormData, value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="lead-field">
      <span>{label}{required && <em> *</em>}</span>
      <input name={name} type={type} value={value} maxLength={limits[name]} placeholder={placeholder} autoComplete={autoComplete} onChange={(event) => onChange(name, event.target.value)} aria-invalid={Boolean(error)} required={required} />
      {error && <small className="lead-field-error">{error}</small>}
    </label>
  );
}
