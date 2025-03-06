
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 animate-fade-in">
        <h1 className="text-7xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
          Oops! We couldn't find the page you're looking for.
        </p>
        <Button size="lg" onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
