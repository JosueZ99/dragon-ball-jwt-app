// components/LoadingSpinner.js
export default function LoadingSpinner({ size = "medium" }) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-4 border-orange-200 border-t-orange-600 ${sizeClasses[size]}`}
      ></div>
    </div>
  );
}
