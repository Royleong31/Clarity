import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  setRating: (value: number) => void;
}

export default function StarRating({ rating, setRating }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          variant="ghost"
          size="sm"
          className={`p-0 ${(hover || rating) >= star ? "text-yellow-400" : "text-gray-300"}`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRating(star)}
        >
          <Star className="h-6 w-6 fill-current" />
        </Button>
      ))}
    </div>
  );
}
