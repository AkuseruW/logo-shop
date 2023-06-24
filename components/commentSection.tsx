'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Products } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface AddCommentSectionProps {
  session: any;
  product: Products;
}

const AddCommentSection: React.FC<AddCommentSectionProps> = ({
  session,
  product,
}) => {
  const router = useRouter()
  const [comment, setComment] = useState('')
  const [ratingValue, setRatingValue] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')


  const handleRating = (rate: number) => {
    setRatingValue(rate)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!session) return

    if (comment.trim() === '') {
      setErrorMessage('Please enter a comment.')
      return
    }

    try {
      const formData = new FormData();
      formData.append('comment', comment)
      formData.append('rating', ratingValue.toString())
      formData.append('session', JSON.stringify(session))
      formData.append('product', JSON.stringify(product))

      const res = await fetch(`/api/reviews`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setComment('')
        setRatingValue(0)
        router.refresh()
      } else {
        setErrorMessage(`Failed to add comment and rating: ${res.status} - ${errorMessage}`)
      }
    } catch (error) {
      console.error('Failed to add comment and rating:', error)
      setErrorMessage('An error occurred while adding comment and rating.')
    }
  };


  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">Review</h3>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* @ts-ignore */}
        <Rating
          emptySymbol={<FontAwesomeIcon icon={farStar} size="1x" />}
          fullSymbol={<FontAwesomeIcon icon={faStar} size="1x" />}
          fractions={2}
          onChange={handleRating}
          initialRating={ratingValue}
        />
        <textarea
          id="comment"
          className="border border-gray-300 rounded-md p-2 mt-4"
          rows={3}
          placeholder="Write a comment..."
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <button
          type="submit"
          className="mt-2 rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:bg-black-500 focus:ring-offset-2"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default AddCommentSection;
