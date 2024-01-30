import { useEffect, useState } from "react";

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (error, errorInfo) => {
            setHasError(true);
            // You can log the error to an error tracking service here
            console.error(error, errorInfo);
        };

        // Attach the error handler to the window object
        window.addEventListener('error', handleError);

        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError) {
        // You can render a fallback UI here
        return <div>Something went wrong!</div>;
    }

    // If there is no error, render the children as normal
    return children;
};

export default ErrorBoundary;