'use client';

import { useState } from 'react';
import { Modal, Input, Rate, Button } from 'antd';
import { StarFilled, StarTwoTone } from '@ant-design/icons';
import { reviews as initialReviews } from '../lib/Constants';

const { TextArea } = Input;

const ReviewSection = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  const handleSubmit = () => {
    const newReview = {
      user: 'John Doe',
      title: 'Beautiful Flooring',
      message: reviewMessage,
      rating: reviewRating,
      response: 'Thank you for your purchase',
    };
    setReviews([newReview, ...reviews]);
    setReviewMessage('');
    setReviewRating(0);
    setIsReviewModalVisible(false);
    setIsSuccessModalVisible(true);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = Array.from({ length: fullStars }, (_, i) => (
      <StarFilled key={i} className="text-orange-500" />
    ));
    if (rating > fullStars) {
      stars.push(
        <StarTwoTone
          key="half"
          twoToneColor="#f97316"
          className="text-orange-500"
        />
      );
    }
    return stars;
  };

  return (
    <div className="py-8 flex flex-col gap-12">
      {/* Reviews List */}
      {reviews.map((review, index) => (
        <div key={index} className="space-y-3">
          {/* Review */}
          <div className="bg-gray-50 shadow-sm rounded-md p-4 max-w-[650px]">
            <p className="text-sm text-[#000000D9]">{review.user}</p>
            <div className="flex items-center gap-1 mt-1">
              {renderStars(review.rating)}
              <p className="font-semibold mt-3 text-[#000000D9] mr-2 text-sm">
                {review.title}
              </p>
            </div>
            <p className="text-sm text-[#00000073] mt-1">{review.message}</p>
          </div>

          {/* Response */}
          <div className="flex w-full justify-end">
            <div className="bg-blue-100 text-sm rounded-md p-3 text-right shadow-sm min-w-[490px]">
              <p className="text-[#000000D9]">{review.user}</p>
              <p className="text-[#00000073] mt-1">{review.response}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Write A Review Button */}
      <div
        className="border mt-10 rounded-sm text-center py-3 cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setIsReviewModalVisible(true)}
      >
        Write A Review
      </div>

      {/* Write Review Modal */}
      <Modal
        open={isReviewModalVisible}
        title={
          <h2 className="text-lg  md:text-2xl font-medium">Write A Review</h2>
        }
        onCancel={() => setIsReviewModalVisible(false)}
        footer={null}
      >
        <p className="mb-1 text-sm text-[#000000D9] mt-4">
          How would you review this product?
        </p>
        <TextArea
          rows={4}
          placeholder="Enter Review"
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
        />
        <p className="mt-4 text-sm text-[#000000D9] mb-2">
          How many star rating would give this product?
        </p>
        <Rate
          value={reviewRating}
          onChange={setReviewRating}
          className="text-orange-500"
        />
        <div className="flex justify-between mt-6">
          <Button
            type="primary"
            size="large"
            onClick={() => setIsReviewModalVisible(false)}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            className="bg-[#002C9D]"
            onClick={handleSubmit}
            disabled={!reviewMessage || reviewRating === 0}
          >
            Submit
          </Button>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        open={isSuccessModalVisible}
        onCancel={() => setIsSuccessModalVisible(false)}
        footer={null}
        centered
      >
        <div className="text-center">
          <h2 className=" text-lg md:text-2xl font-medium mb-4">Thank You</h2>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-[#002C9D] rounded-full flex items-center justify-center">
              <span className="text-white text-3xl font-bold">✓</span>
            </div>
          </div>
          <h3 className="text-base m:text-lg text-[#1E1E1E] font-medium mb-2">
            Reviews Shared Successfully
          </h3>
          <p className="text-[#00000073] mb-6">
            Thank you for taking your time to review this product. We appreciate
            your honesty
          </p>
          <Button
            type="primary"
            className="bg-[#002C9D] py-3 w-full"
            onClick={() => setIsSuccessModalVisible(false)}
          >
            Go Back
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewSection;
 