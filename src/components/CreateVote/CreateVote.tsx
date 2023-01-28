import { useVoteContext } from "../../context/VoteContext";
import AddOption from "./AddOption/AddOption";
import EditableOptionItem from "./EditableOptionItem/EditableOptionItem";

const CreateVote = () => {
  const { setQuestionTitle, resetVote, question } = useVoteContext();

  return (
    <div>
      <h3>Create Vote</h3>
      <input
        type="text"
        placeholder="Question..."
        value={question.title}
        onChange={(e) => setQuestionTitle(e.target.value)}
        maxLength={80}
      />

      {!!question.options.length &&
        question.options.map((opt) => (
          <EditableOptionItem key={opt.id} option={opt} />
        ))}
      {question.options.length !== 10 && <AddOption></AddOption>}
      <div className="footer">
        <span>{`${question.options.length}/10 possible answers`}</span>
        <button type="button" onClick={() => resetVote()}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default CreateVote;
