import axios from 'axios';

// POST LOGIN (로그인)
export const fetchLogin = async (username: string, password: string) => {
  const response = await axios.post('http://noum.iptime.org:9000/admin/login', {
    username: username,
    password: password,
  });
  console.log('axios post:', response);
  return response;
};

// POST SIGNUP (회원가입)
export const fetchSignUp = async (data: {
  username: string;
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    const response = await axios.post('http://noum.iptime.org:9000/admin/signup', data);
    return response;
  } catch (error) {
    console.error('회원가입 중 오류:', error);
    throw error;
  }
};

// GET ALL USERS (사용자 관리)
export const fetchUsers = async () => {
  const response = await axios
    .get('http://noum.iptime.org:9000/admin/users')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET SINGLE USER (전체 사용자 목록에서 id로 필터링)
export const fetchSingleUser = async (id: any) => {
  const users = await fetchUsers(); // 전체 사용자 목록을 가져옴
  const user = users.find((user: { id: any }) => user.id === Number(id)); // id를 숫자로 변환하여 비교

  if (!user) throw new Error('User not found'); // 사용자가 없으면 오류 발생
  return user; // 해당 사용자를 반환
};

// DELETE USER (사용자 삭제)
export const fetchDeleteUser = async (userId: number) => {
  try {
    const apiUrl = `http://noum.iptime.org:9000/admin/user?user_id=${userId}`; // user_id를 쿼리 파라미터로 전달
    const response = await axios.delete(apiUrl);
    console.log(`Deleted user with ID: ${userId}`, response.data);
    return response.data; // 삭제 성공 시 반환 데이터
  } catch (error) {
    console.error(`Error deleting user with ID: ${userId}`, error);
    throw error; // 오류 발생 시 예외 던지기
  }
};

// GET ALL PRODUCTS (제품 관리)
export const fetchProducts = async () => {
  const response = await axios
    .get('http://noum.iptime.org:9000/admin/items')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET SINGLE PRODUCT (전체 제품 목록에서 id로 필터링)
export const fetchSingleProduct = async (id: any) => {
  const products = await fetchProducts(); // 전체 사용자 목록을 가져옴
  const product = products.find((product: { id: any }) => product.id === Number(id)); // id를 숫자로 변환하여 비교

  if (!product) throw new Error('User not found');
  return product;
};

// DELETE ITEM (제품 삭제)
export const fetchDeleteProduct = async (itemId: number) => {
  try {
    const apiUrl = `http://noum.iptime.org:9000/admin/item_info?item_id=${itemId}`;
    const response = await axios.delete(apiUrl);
    console.log(`Deleted item with ID: ${itemId}`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting item with ID: ${itemId}`, error);
    throw error;
  }
};

// GET BOOK INFO BY ISBN (책 정보 요청)
export const fetchBookByIsbn = async (isbn: any) => {
  try {
    const response = await axios.get(`http://noum.iptime.org:9000/books/book_info/isbn?isbn=${isbn}`);
    
    console.log('axios get:', response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// ISBN으로 책 이미지를 가져오는 함수
export const fetchBookThumbnailByIsbn = async (isbn: any) => {
  try {
    const response = await axios.get(`http://noum.iptime.org:9000/books/thumbnail?isbn=${isbn}`, {
      responseType: 'blob',  // 이미지 데이터를 Blob 형식으로 받기
    });
    
    const imageUrl = URL.createObjectURL(response.data); // 받은 Blob 데이터를 URL로 변환

    return imageUrl; // 변환된 이미지 URL 반환
  } catch (error) {
    console.error('Error fetching book thumbnail:', error);
    throw error;
  }
};

// GET ALL POSTS (신고 관리)
export const fetchPosts = async () => {
  const response = await axios
    .get('http://noum.iptime.org:9000/admin/reports')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET SINGLE POST (신고 상세)
export const fetchSinglePost = async (id: any) => {
  const posts = await fetchPosts(); // 전체 사용자 목록을 가져옴
  const post = posts.find((post: { id: any }) => post.id === Number(id)); // id를 숫자로 변환하여 비교

  if (!post) throw new Error('User not found');
  return post;
};

// POST BLOCK (피신고자 차단)
export const fetchBlockUser = async (targetId: any) => {
  const response = await axios
    .post('http://noum.iptime.org:9000/admin/reports/block', null, {
      params: {
        user_id: targetId,
      },
    })
    .then((res) => {
      console.log('Block User Response:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.error('Error blocking user:', err);
      throw err;
    });

  return response;
};

// DELETE POST (신고 삭제)
export const fetchDeletePost = async (reportId: number) => {
  try {
    const apiUrl = `http://noum.iptime.org:9000/admin/reports?report_id=${reportId}`;
    const response = await axios.delete(apiUrl);
    console.log(`Deleted report with ID: ${reportId}`, response.data);
    return response.data; 
  } catch (error) {
    console.error(`Error deleting report with ID: ${reportId}`, error);
    throw error;
  }
};

// GET ALL NOTES (공지사항 관리)
export const fetchNotes = async () => {
  const response = await axios
    .get('http://noum.iptime.org:9000/admin/notice')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// POST NOTICE (공지사항 등록)
export const fetchCreateNotice = async (data: { title: any; content: any }) => {
  try {
    const response = await axios.post('http://noum.iptime.org:9000/admin/notice', data);
    return response.data;
  } catch (error) {
    console.error('Error creating notice:', error);
    throw error;
  }
};

// DELETE NOTICE (공지사항 삭제)
export const fetchDeleteNotice = async (id: number) => {
  try {
    const notes = await fetchNotes();
    const noticeToDelete = notes.find((note: { id: number }) => note.id === id);

    if (!noticeToDelete) {
      throw new Error('삭제할 공지사항을 찾을 수 없습니다.');
    }

    const response = await axios.delete(`http://noum.iptime.org:9000/admin/notice?notice_id=${id}`);
    return response;
  } catch (error) {
    console.error('공지사항 삭제 실패:', error);
    throw error;
  }
};

