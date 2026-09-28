export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> {
  legend: string;
  name: string;
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <fieldset>
      <legend class="text-sm font-medium text-muted">{legend}</legend>
      <div class="mt-1 flex gap-1 rounded-lg border border-line bg-canvas p-1">
        {options.map((option) => (
          <label key={option.value} class="flex-1">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
              class="peer sr-only"
            />
            <span class="block cursor-pointer rounded-md px-3 py-2 text-center text-base text-muted hover:text-ink peer-checked:bg-surface peer-checked:font-semibold peer-checked:text-accent-text peer-checked:ring-1 peer-checked:ring-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
