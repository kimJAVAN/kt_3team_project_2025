/*
  실행 방법
  1. SEARCH_QUERY 부분을 각자 원하는 검색어로 바꾸고,
  2. 터미널에서 node script/fetchBook.js 명령 실행하시면 자동으로 DB에 데이터가 들어가집니다.

  params 정보는 노션에 알라딘API 링크 올려놨습니다.
  (fetchBooks 함수에서 MaxResults를 최대 100개까지 설정할 수 있습니다.)
  
  만약 코드에 빨간줄이 있어도 실행하시면 됩니다. 오류 발생하면 알려주세요.
*/
import axios from 'axios';
import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();

// Firebase Admin SDK 초기화
admin.initializeApp({
  credential: admin.credential.cert('./scripts/serviceAccountKey.json'),
});
const db = admin.firestore();

// 알라딘 API에서 도서 정보 가져오기
const ALADIN_KEY = process.env.ALADIN_KEY;
/*
  검색어.
  변경 후 실행하시면 됩니다.
*/
const SEARCH_QUERY = '자바스크립트';
const fetchBooks = async () => {
  try {
    const response = await axios.get(
      'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx',
      {
        params: {
          ttbKey: ALADIN_KEY, // 알라딘 API 키 (.env에 저장)
          Query: SEARCH_QUERY, // 검색어
          start: 1, // 검색 시작 인덱스
          MaxResults: 10, // 한 번에 가져올 최대 개수
          Version: 20131101,
          output: 'JS', // JSON 형식으로 받기
        },
      }
    );

    if (response.data && response.data.item) {
      return response.data.item;
    }
    return [];
  } catch (error) {
    console.error('Error fetching books from ALADIN API:', error);
    return [];
  }
};

// 가져온 도서 정보를 Firestore에 저장
const saveBooksToFirestore = async (books) => {
  try {
    const batch = db.batch(); // 여러 문서를 한 번에 쓰기 위한 batch
    for (const book of books) {
      // Firestore 문서 ID를 ISBN13 기준으로 설정 (중복 방지)
      const docRef = db.collection('books').doc(book.isbn13 || book.isbn);

      // Firestore에 저장할 데이터 구조 정의
      const bookData = {
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        categoryName: book.categoryName || '기타',
        pubDate: book.pubDate,
        priceStandard: book.priceStandard,
        cover: book.cover,
        description: book.description,
        link: book.link,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      batch.set(docRef, bookData, { merge: true });
    }
    await batch.commit();
    console.log('Successfully saved books to Firestore.');
  } catch (error) {
    console.error('Error saving books to Firestore:', error);
  }
};

// 전체 실행 흐름
const main = async () => {
  if (!ALADIN_KEY) {
    console.error('Please create a .env file and add your ALADING KEY to it.');
    return;
  }

  console.log('Fetching books from ALADIN API...');
  const books = await fetchBooks();
  if (books.length > 0) {
    console.log(`Fetched ${books.length} books.`);
    await saveBooksToFirestore(books);
  } else {
    console.log('No books fetched.');
  }
};

main();
