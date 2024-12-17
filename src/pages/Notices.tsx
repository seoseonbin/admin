import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchNotes, fetchCreateNotice, fetchDeleteNotice } from '../api/ApiCollection';
import NoteCard from '../components/notes/NoteCard';

interface Note {
  id: number;
  title: string;
  content: string;
}

const Notices = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [noteSelected, setNoteSelected] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    id: 0,
    title: '',
    content: '',
  });
  const [titleSelected, setTitleSelected] = React.useState('');
  const [contentSelected, setContentSelected] = React.useState('');
  const [isWriting, setIsWriting] = React.useState(false); // 글쓰기 상태
  const [newNote, setNewNote] = React.useState({ title: '', content: '' }); // 새로운 글 제목과 내용

  const queryClient = useQueryClient();

  // 공지사항 목록 가져오기
  const { data, isLoading, isError, isSuccess } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
    refetchOnWindowFocus: false, // 윈도우 포커스 시 리패치 방지
  });

  React.useEffect(() => {
    if (isError) {
      toast.error('데이터를 가져오는 데 실패했습니다!', { id: 'promiseNotes' });
    }
  }, [isError]);

  // 공지사항 작성용 mutation
  const createNoticeMutation = useMutation({
    mutationFn: fetchCreateNotice, // fetchCreateNotice가 반환하는 데이터 타입을 알맞게 처리
    onSuccess: () => {
      toast.success('공지사항이 등록되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['notes'] }); // 캐시를 무효화하고 목록을 갱신
      setIsWriting(false); // 글쓰기 모드 종료
      setNewNote({ title: '', content: '' }); // 입력값 초기화
    },
    onError: () => {
      toast.error('공지사항 등록에 실패했습니다.');
    },
  });

  // 공지사항 삭제 처리
  const handleDeleteNote = async (id: number) => {
    try {
      // 삭제 요청
      const response = await fetchDeleteNotice(id);
      
      if (response) {
        toast.success('공지사항이 삭제되었습니다!');
        setNoteSelected(false); // 선택된 글 초기화
        queryClient.invalidateQueries({ queryKey: ['notes'] }); // 삭제 후 목록 리패치
      } else {
        toast.error('공지사항 삭제에 실패했습니다.');
      }
    } catch (error) {
      toast.error('공지사항 삭제에 실패했습니다.');
    }
  };

  // 글쓰기 버튼 클릭 시 활성화
  const handleWriteClick = () => {
    setIsWriting(true); // 글쓰기 모드 활성화
  };

  // 글쓰기 취소
  const handleCancelWrite = () => {
    setIsWriting(false); // 글쓰기 모드 취소
  };

  // 글 등록 처리
  const handleSubmitNote = () => {
    const noteToSubmit = { id: 0, title: newNote.title, content: newNote.content };
    createNoticeMutation.mutate(noteToSubmit); // 공지사항 등록
  };

  // 검색된 공지사항 필터링
  const filteredNotes = isSuccess
    ? data.filter((note) => 
        note.title.toLowerCase().includes(searchQuery) || 
        note.content.toLowerCase().includes(searchQuery)
      )
    : [];

  return (
    <div className="w-full p-0 m-0 relative">
      <div className="w-full flex flex-col items-stretch gap-5 xl:gap-8 relative">
        <div className="w-full grid xl:grid-cols-5 relative gap-10">
          {/* 첫 번째 컬럼 */}
          <div className="w-full flex flex-col gap-7 xl:gap-5 xl:col-span-2">
            <div className="w-full flex items-center justify-between">
              <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
                공지사항
              </h2>
              <button
                className="btn btn-primary"
                onClick={handleWriteClick} // 글쓰기 모드 활성화
              >
                + 글쓰기
              </button>
            </div>

            {/* 글쓰기 모드 */}
            {isWriting && (
              <div className="form-control mt-5">
                <input
                  type="text"
                  placeholder="제목"
                  className="input input-bordered w-full mb-3"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <textarea
                  placeholder="내용"
                  className="textarea textarea-bordered w-full mb-3"
                  rows={4}
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                ></textarea>
                <div className="flex justify-end gap-4">
                  <button
                    className="btn btn-success"
                    onClick={handleSubmitNote} // 공지사항 등록
                  >
                    등록
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={handleCancelWrite} // 글쓰기 취소
                  >
                    취소
                  </button>
                </div>
              </div>
            )}

            {/* 검색박스 */}
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-full"
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
            </div>

            {/* 공지사항 리스트 */}
            {isLoading ? (
              <div>Loading...</div> // 로딩 중 메시지
            ) : isSuccess ? (
              filteredNotes.length > 0 ? (
                filteredNotes.map((note: Note) => (
                  <NoteCard
                    key={note.id}
                    title={note.title}
                    content={note.content}
                    setNoteSelected={setNoteSelected}
                    selectedCard={selectedCard}
                    setSelectedCard={() =>
                      setSelectedCard({ id: note.id, title: note.title, content: note.content })
                    }
                    setTitleSelected={setTitleSelected}
                    setContentSelected={setContentSelected}
                  />
                ))
              ) : (
                <div>검색 결과가 없습니다.</div>
              )
            ) : (
              <div>데이터를 가져오는 데 실패했습니다.</div>
            )}
          </div>

          {/* 두 번째 컬럼 */}
          <div className="hidden w-full relative xl:inline-block xl:col-span-3 bg-base-100">
            {!noteSelected ? (
              <div className="sticky xl:top-[88px] z-10 xl:h-[80vh] flex justify-center items-center">
                <h4>하나의 글을 선택하세요</h4>
              </div>
            ) : (
              <div className="sticky xl:top-[90px] xl:h-[80vh] z-10 flex flex-col items-start gap-5 xl:pr-10 xl:pb-10 overflow-y-auto">
                <h2 className="font-bold text-2xl xl:text-3xl mt-0 pt-0 text-base-content dark:text-neutral-200">
                  {titleSelected}
                </h2>
                <p
                  className="xl:text-[20px] xl:leading-normal"
                  style={{ whiteSpace: 'pre-wrap' }} // 줄바꿈을 유지하도록 스타일 적용
                >
                  {contentSelected}
                </p>
                <button
                  className="btn btn-error mt-4 flex justify-end"
                  onClick={() => handleDeleteNote(selectedCard.id)} // 공지사항 삭제
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notices;
