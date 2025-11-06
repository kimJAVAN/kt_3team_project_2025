/**
 * Firestore에서 책 목록을 무한 스크롤(Infinite Scroll) 방식으로 불러오는 커스텀 훅입니다.
 * @param {object} options - 옵션 객체
 * @param {number} [options.pageSize=20] - 한 번에 불러올 문서의 개수
 * @param {string | null} [options.category=null] - 필터링할 카테고리
 * @param {string | null} [options.search=null] - 검색어 (title 기준 접두사 검색)
 * @param {string} [options.orderField="createdAt"] - 정렬 기준 필드
 * @param {("asc" | "desc")} [options.orderDirection="desc"] - 정렬 방향
 */
import { useEffect, useState, useCallback, useRef } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";

export const useBookList = ({
  pageSize = 20,
  category = null,
  search = null,
  orderField = "createdAt",
  orderDirection = "desc",
}) => {
  const [books, setBooks] = useState([]);

  // 마지막 문서 커서를 저장하는 ref
  const cursorRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  // 책 데이터를 불러오는 함수. reset 플래그를 통해 커서를 초기화
  const fetchBooks = useCallback(
    async (reset = false) => {
      // 중복 호출 방지
      if (loading) return;
      setLoading(true);

      // 다음 페이지가 없고 리셋이 아닐 경우, 함수 실행 중단
      if (!hasNext && !reset) {
        setLoading(false);
        return;
      }

      try {
        const ref = collection(db, "books");
        const queryConstraints = [];

        // 1. Where 제약 조건
        if (category) {
          queryConstraints.push(where("category", "==", category));
        }

        // 2. 검색 제약 조건 (Firestore 접두사 검색 최적화)
        if (search) {
          queryConstraints.push(where("title", ">=", search));
          queryConstraints.push(where("title", "<=", search + "\uf8ff"));
        } else {
          // 검색이 없을 경우, 지정된 정렬 조건 사용
          queryConstraints.push(orderBy(orderField, orderDirection));
        }

        // 3. 커서/Reset 제약 조건
        if (reset) {
          cursorRef.current = null;
        }

        if (cursorRef.current) {
          queryConstraints.push(startAfter(cursorRef.current));
        }

        // 4. Limit 제약 조건 (다음 페이지 존재 확인을 위해 `pageSize + 1`로 요청)
        queryConstraints.push(limit(pageSize + 1));

        const q = query(ref, ...queryConstraints);
        const snapshot = await getDocs(q);

        // 문서 데이터 매핑
        const fetchedDocs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 다음 페이지 존재 여부 판단
        const hasMore = fetchedDocs.length > pageSize;

        // 실제로 보여줄 문서 (pageSize만큼만 슬라이스)
        const visibleDocs = hasMore
          ? fetchedDocs.slice(0, pageSize)
          : fetchedDocs;

        // 커서 업데이트 로직
        // 마지막 문서의 스냅샷을 커서로 사용. 데이터가 없으면 null로 설정
        cursorRef.current =
          visibleDocs.length > 0 ? snapshot.docs[visibleDocs.length - 1] : null;

        // 상태 업데이트: reset이면 새 목록, 아니면 기존 목록에 추가
        setBooks((prev) => (reset ? visibleDocs : [...prev, ...visibleDocs]));
        setHasNext(hasMore);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    },
    [pageSize, category, search, orderField, orderDirection]
  );

  // 카테고리/검색/정렬 조건이 변경될 때 데이터를 초기화하고 다시 불러오기
  useEffect(() => {
    // 변경 시 목록을 비우고, 다음 페이지 존재 여부를 true로 리셋
    setBooks([]);
    setHasNext(true);
    // fetchBooks 함수를 reset 플래그와 함께 호출
    fetchBooks(true);
  }, [category, search, orderField, orderDirection, fetchBooks]);

  return { books, fetchBooks, loading, hasNext, setBooks };
};
