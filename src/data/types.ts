export interface Period {
  from: string;
  to: string;
}

export interface Metric {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  spoken: string;
  tag?: string;
}
