import { Star } from "lucide-react";

export default function Rating({ value, reviews, size = 14 }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground">
      <Star size={size} className="fill-sun text-sun" />
      <span className="text-foreground">{value.toFixed(1)}</span>
      {reviews != null && <span className="font-semibold">({reviews})</span>}
    </span>
  );
}
