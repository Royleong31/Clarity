import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const PartialStar = ({
  fillPercentage = 55,
  size = 24,
  fillColor = "#FABF0CFF",
  outlineColor = "gray",
}) => {
  // Ensure fillPercentage is between 0 and 100
  const clampedFillPercentage = Math.max(0, Math.min(100, fillPercentage));

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size}>
      <defs>
        <clipPath id={`starClip-${fillPercentage}`}>
          <rect x="0" y="0" width={`${clampedFillPercentage}%`} height="100%" />
        </clipPath>
      </defs>

      {/* Outline star */}
      <path
        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
        fill="none"
        stroke={outlineColor}
        strokeWidth="1"
      />

      {/* Filled star */}
      <path
        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
        fill={fillColor}
        clipPath={`url(#starClip-${fillPercentage})`}
      />
    </svg>
  );
};

function RatingCard({ rating }: { rating: number }) {
  // average rating
  const starVal = [0, 0, 0, 0, 0];

  for (let i = 0; i < starVal.length; i++) {
    console.log("i", i, "rating", rating, rating - i);
    if (rating - i >= 1) {
      starVal[i] = 100;
    } else {
      starVal[i] = (rating - i) * 100;
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-large">Average Rating over the past month</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 .587l3.668 7.568 8.322 1.207-6.01 5.835 1.415 8.284L12 18.896l-7.395 3.88L6.02 15.202l-6.01-5.835 8.322-1.207z" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-1">
          {starVal.map((value, index) => (
            <PartialStar key={index} fillPercentage={value} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RatingCard;
