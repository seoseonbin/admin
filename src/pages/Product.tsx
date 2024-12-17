import React from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleProduct, fetchBookByIsbn, fetchSingleUser, fetchBookThumbnailByIsbn } from '../api/ApiCollection'; // fetchBookThumbnailByIsbn 임포트

const Product = () => {
  const { id } = useParams();  // URL에서 id 추출

  // 제품 데이터 가져오기
  const { isLoading: productLoading, isError: productError, data: productData, isSuccess: productSuccess } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchSingleProduct(id || ''),
  });

  // ISBN을 통해 책 정보 가져오기
  const { data: bookData } = useQuery({
    queryKey: ['book', productData?.isbn],
    queryFn: () => fetchBookByIsbn(productData?.isbn),
    enabled: !!productData?.isbn,  // ISBN이 있을 때만 호출
  });

  // 책 이미지 가져오기 (Blob URL로 변환)
  const { data: bookImage } = useQuery({
    queryKey: ['bookThumbnail', productData?.isbn],
    queryFn: () => fetchBookThumbnailByIsbn(productData?.isbn),
    enabled: !!productData?.isbn,  // ISBN이 있을 때만 호출
  });

  // 판매자 정보 가져오기
  const { data: sellerData } = useQuery({
    queryKey: ['user', productData?.user_id],
    queryFn: () => fetchSingleUser(productData?.user_id),
    enabled: !!productData?.user_id, // user_id가 있을 때만 호출
  });

  React.useEffect(() => {
    if (productError) {
      toast.error('Error while getting the product data!', {
        id: 'promiseProduct',
      });
    }
  }, [productError]);

  return (
    <div id="singleProduct" className="w-full p-0 m-0">
      {/* container */}
      <div className="w-full gap-10 mt-5 xl:mt-0">
        {/* photo block */}
        <div className="w-full flex items-center gap-3">
          <div className="flex items-center gap-3 xl:gap-8 xl:mb-4">
            <div className="">
              {productLoading ? (
                <div className="w-24 xl:w-36 h-24 xl:h-36 skeleton dark:bg-neutral"></div>
              ) : productSuccess ? (
                <div className="w-24 xl:w-36">
                  {/* 책 이미지가 있을 경우 이미지 출력, 없으면 기본 아이콘 사용 */}
                  <img
                    src={bookImage || '/book.jpg'}  // Blob URL 또는 기본 이미지
                    alt="book-thumbnail"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="w-full grid grid-cols-3 xl:flex gap-5 xl:gap-8">
              <div className="col-span-1 flex flex-col items-start gap-3 xl:gap-4">
                <span>ISBN</span>
                <span>제목</span>
                <span>저자</span>
                <span>출판사</span>
                <span>발행일</span>
                <span>분야</span>
              </div>
              <div className="col-span-2 flex flex-col items-start gap-3 xl:gap-4">
                <span className="font-semibold">
                  {bookData?.isbn || 'Unknown'}
                </span>
                <span className="font-semibold">
                  {bookData?.title || 'Unknown'}
                </span>
                <span className="font-semibold">
                  {bookData?.author || 'Unknown'}
                </span>
                <span className="font-semibold">
                  {bookData?.publisher || 'Unknown'}
                </span>
                <span className="font-semibold">
                  {bookData?.published_at || 'Unknown'}
                </span>
                <span className="font-semibold">
                  {bookData?.category || 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="divider text-sm"></div>
        {/* detail block */}
        <div className="w-full flex gap-8">
          {productLoading ? (
            <div className="w-full xl:w-[50%} h-52 skeleton dark:bg-neutral"></div>
          ) : productSuccess ? (
            <div className="w-full grid grid-cols-3 xl:flex gap-5 xl:gap-8">
              {/* column 1 */}
              <div className="col-span-1 flex flex-col items-start gap-3 xl:gap-4">
                <span>판매자</span>
                <span>가격</span>
                <span>상태</span>
                <span>등록 날짜</span>
                <span>설명</span>
              </div>
              {/* column 2 */}
              <div className="col-span-2 flex flex-col items-start gap-3 xl:gap-4">
                <span className="font-semibold">
                  {sellerData?.username}
                </span>
                <span className="font-semibold">
                  {productData?.price}
                </span>
                <span className="font-semibold">
                  {productData?.book_condition}
                </span>
                <span className="font-semibold">
                  {productData?.published_date}
                </span>
                <span className="font-semibold">
                  {productData?.description}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full xl:w-[50%} h-52 skeleton dark:bg-neutral"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;