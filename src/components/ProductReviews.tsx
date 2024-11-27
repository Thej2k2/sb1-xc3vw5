import React, { useEffect, useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { Review } from '../types';
import { fetchReviews, aggregateReviews } from '../utils/reviews';

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      const fetchedReviews = await fetchReviews(productId);
      setReviews(fetchedReviews);
      setLoading(false);
    };
    loadReviews();
  }, [productId]);

  const { average, total } = aggregateReviews(reviews);

  if (loading) {
    return <div className="animate-pulse h-24 bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-1">
          <span className="font-medium">{average}</span>
          <Star size={16} fill="currentColor" />
        </div>
        <span className="text-gray-600">{total} reviews</span>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">{review.author[0]}</span>
                </div>
                <span className="font-medium">{review.author}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <button className="flex items-center gap-1 hover:text-gray-700">
                <ThumbsUp size={14} />
                Helpful ({review.helpfulCount})
              </button>
              <button className="flex items-center gap-1 hover:text-gray-700">
                <MessageCircle size={14} />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};