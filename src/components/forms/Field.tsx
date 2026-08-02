"use client";

import { useId } from "react";

import { cn } from "@/lib/cn";

/**
 * Form primitives.
 *
 * Every control ships its label, error wiring and 44px touch target together,
 * so an accessible field is the path of least resistance rather than something
 * remembered per usage.
 */

const CONTROL =
  "w-full border bg-cream-raised px-4 py-3 font-body text-[0.9375rem] text-on-cream " +
  "min-h-[2.75rem] transition-colors duration-fast ease-si " +
  "placeholder:text-on-cream-muted/60 " +
  "focus:border-gold focus:outline-none focus-visible:outline-none";

const OK = "border-cream-line";
const BAD = "border-maroon";

function Shell({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="font-body text-sm font-medium text-on-cream"
      >
        {label}
        {required ? (
          <span className="ml-1 text-ember" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-on-cream-muted">
            optional
          </span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-on-cream-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-maroon">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type BaseProps = {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

export function TextField({
  name,
  label,
  hint,
  error,
  required,
  className,
  ...rest
}: BaseProps & React.ComponentPropsWithoutRef<"input">) {
  const id = useId();
  return (
    <Shell {...{ id, label, hint, error, required, className }}>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint && `${id}-hint`, error && `${id}-error`]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={cn(CONTROL, error ? BAD : OK)}
        {...rest}
      />
    </Shell>
  );
}

export function TextArea({
  name,
  label,
  hint,
  error,
  required,
  className,
  ...rest
}: BaseProps & React.ComponentPropsWithoutRef<"textarea">) {
  const id = useId();
  return (
    <Shell {...{ id, label, hint, error, required, className }}>
      <textarea
        id={id}
        name={name}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint && `${id}-hint`, error && `${id}-error`]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={cn(CONTROL, "resize-y", error ? BAD : OK)}
        {...rest}
      />
    </Shell>
  );
}

export function SelectField({
  name,
  label,
  hint,
  error,
  required,
  className,
  options,
  ...rest
}: BaseProps & {
  options: readonly { value: string; label: string }[];
} & React.ComponentPropsWithoutRef<"select">) {
  const id = useId();
  return (
    <Shell {...{ id, label, hint, error, required, className }}>
      <select
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(CONTROL, "appearance-none pr-10", error ? BAD : OK)}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Shell>
  );
}

/** Multi-select rendered as toggle chips — faster on touch than a listbox. */
export function ChipGroup({
  label,
  hint,
  error,
  required,
  options,
  selected,
  onToggle,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  options: readonly { value: string; label: string }[];
  selected: readonly string[];
  onToggle: (value: string) => void;
  className?: string;
}) {
  return (
    <fieldset className={cn("flex flex-col gap-2", className)}>
      <legend className="font-body text-sm font-medium text-on-cream">
        {label}
        {required ? (
          <span className="ml-1 text-ember" aria-hidden>
            *
          </span>
        ) : null}
      </legend>
      {hint ? <p className="text-xs text-on-cream-muted">{hint}</p> : null}
      <div className="flex flex-wrap gap-2 pt-1">
        {options.map((o) => {
          const on = selected.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(o.value)}
              className={cn(
                "min-h-[2.75rem] border px-4 font-body text-sm transition-colors duration-fast ease-si",
                on
                  ? "border-gold bg-gold text-ink"
                  : "border-cream-line bg-cream-raised text-on-cream hover:border-gold",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="text-sm font-medium text-maroon">{error}</p>
      ) : null}
    </fieldset>
  );
}

export function CheckField({
  name,
  label,
  error,
  checked,
  onChange,
  className,
}: {
  name: string;
  label: React.ReactNode;
  error?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 py-2 font-body text-sm text-on-cream"
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 flex-none accent-[rgb(var(--si-gold))]"
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-maroon">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Honeypot. Off-screen rather than display:none — some bots skip hidden
 * inputs, and a positioned field still gets filled.
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      aria-hidden
      className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
    >
      <label htmlFor="company_website">Company website</label>
      <input
        id="company_website"
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
