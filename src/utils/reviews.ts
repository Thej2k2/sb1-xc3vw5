import { Review } from '../types';

export const fetchReviews = async (productId: string): Promise<Review[]> => {
  // This function can be configured to fetch reviews from different sources
  // Example sources: Google Reviews API, TrustPilot API, etc.
  try {
    const response = await fetch(`/api/reviews/${productId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const aggregateReviews = (reviews: Review[]): {
  average: number;
  total: number;
} => {
  if (!reviews.length) return { average: 0, total: 0 };
  
  const total = reviews.length;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  
  return {
    average: Number((sum / total).toFixed(1)),
    total
  };
};