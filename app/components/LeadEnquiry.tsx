"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

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
  if (trimmed.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!trimmed.email && !trimmed.phone) {
    errors.email = "Please provide an email address or phone number.";
    errors.phone = "Please provide an email address or phone number.";
  }
  if (trimmed.phone && !/^[+()\d][\d\s().-]{6,28}$/.test(trimmed.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  (Object.keys(limits) as Array<keyof LeadFormData>).forEach((field) => {
    if (trimmed[field].length > limits[field]) {
      errors[field] = `Please keep this under ${limits[field]} characters.`;
    }
  });

  return { errors, trimmed };
}

export default function LeadEnquiry({ className, children }: LeadEnquiryProps) {
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

  return (
    <>
      <button type="button" className={className} onClick={() => { setOpen(true); setStatus("idle"); }}>
        {children}
      </button>
      {open && (
        <div className="lead-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget && status !== "submitting") setOpen(false);
        }}>
          <section className="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
            <div className="lead-modal-header">
              <div>
                <p className="eyebrow">Start with clarity</p>
                <h2 id="lead-modal-title">Tell us where you want to go.</h2>
                <p>Share a few details and our team will help map your next step.</p>
              </div>
              <button ref={closeButtonRef} type="button" className="lead-modal-close" onClick={() => setOpen(false)} disabled={status === "submitting"} aria-label="Close enquiry form">
                <X size={20} />
              </button>
            </div>

            {status === "success" ? (
              <div className="lead-success" role="status">
                <span><Check size={24} /></span>
                <h3>Thank you!</h3>
                <p>Your enquiry has been submitted successfully. Our team will contact you shortly.</p>
                <button type="button" className="teal-button" onClick={() => setOpen(false)}>Close</button>
              </div>
            ) : (
              <form className="lead-form" onSubmit={submit} noValidate>
                <div className="lead-form-grid">
                  <LeadField label="Full Name" name="name" value={form.name} onChange={updateField} error={errors.name} required />
                  <LeadField label="Email Address" name="email" type="email" value={form.email} onChange={updateField} error={errors.email} />
                  <LeadField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={updateField} error={errors.phone} />
                  <LeadField label="Study Destination / Country" name="country" value={form.country} onChange={updateField} error={errors.country} />
                  <LeadField label="Course / Program" name="course" value={form.course} onChange={updateField} error={errors.course} />
                  <LeadField label="Preferred Intake" name="intake" value={form.intake} onChange={updateField} error={errors.intake} />
                </div>
                <label className="lead-field lead-field-full">
                  <span>Message</span>
                  <textarea name="message" value={form.message} maxLength={limits.message} onChange={(event) => updateField("message", event.target.value)} aria-invalid={Boolean(errors.message)} />
                  {errors.message && <small className="lead-field-error">{errors.message}</small>}
                </label>
                <p className="lead-form-note">Required: full name and an email address or phone number.</p>
                {status === "error" && <p className="lead-submit-error" role="alert">Something went wrong while submitting your enquiry. Please try again.</p>}
                <button className="teal-button lead-submit" type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Submitting..." : "Send Enquiry"}
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}

function LeadField({ label, name, type = "text", value, onChange, error, required = false }: {
  label: string;
  name: keyof LeadFormData;
  type?: string;
  value: string;
  onChange: (field: keyof LeadFormData, value: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="lead-field">
      <span>{label}{required && <em> *</em>}</span>
      <input name={name} type={type} value={value} maxLength={limits[name]} onChange={(event) => onChange(name, event.target.value)} aria-invalid={Boolean(error)} required={required} />
      {error && <small className="lead-field-error">{error}</small>}
    </label>
  );
}
