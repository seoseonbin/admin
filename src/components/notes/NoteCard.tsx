import React from 'react';

interface NoteCardProps {
  setNoteSelected: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCard: {
    title: string;
    content: string;
  };
  setSelectedCard: React.Dispatch<
    React.SetStateAction<{ title: string; content: string }>
  >;
  setTitleSelected: React.Dispatch<React.SetStateAction<string>>;
  setContentSelected: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  content: string;
}

const NoteCard: React.FC<NoteCardProps> = ({
  setNoteSelected,
  selectedCard,
  setSelectedCard,
  setTitleSelected,
  setContentSelected,
  title,
  content,
}) => {
  return (
    <div
      onClick={() => {
        setNoteSelected(true);
        setSelectedCard({
          title: title,
          content: content,
        });
        setTitleSelected(title);
        setContentSelected(content);
      }}
      className={`w-full btn min-h-[auto] h-auto rounded-3xl border-none flex flex-col items-start text-start group bg-[#fafafa] hover:bg-primary hover:text-primary-content dark:bg-neutral dark:hover:bg-primary
      ${
        selectedCard.title === title
          ? 'bg-primary text-primary-content dark:bg-primary dark:primary-content hover:text-primary-content dark:hover:text-primary-content'
          : 'bg-[#f7f7f7] hover:bg-primary hover:text-primary-content dark:bg-neutral dark:hover:bg-primary'
      }
      `}
    >
      <div className="card-body items-start text-start px-5 py-7 gap-3">
        <h4 className="card-title xl:text-base font-bold">{title}</h4>
        <div
          className={`w-full flex justify-between items-center text-xs group-hover:text-primary-content ${
            selectedCard.content === content
              ? 'text-primary-content dark:text-primary-content'
              : 'text-neutral-400'
          }`}
        >
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
