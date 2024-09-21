import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

function RatingCard({ rating }: { rating: number }) {
  // average rating
  const stars = Array(rating).fill(0); // Create an array of 5 elements for stars

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-large">
          Average Rating over the past month
        </CardTitle>
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
          {stars.map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7 text-yellow-500"
            >
              <path d="M12 .587l3.668 7.568 8.322 1.207-6.01 5.835 1.415 8.284L12 18.896l-7.395 3.88L6.02 15.202l-6.01-5.835 8.322-1.207z" />
            </svg>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RatingCard;
