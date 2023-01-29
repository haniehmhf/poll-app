import { useState } from "react";
import { useVoteContext } from "../../context/VoteContext";
import OptionItem from "./OptionItem/OptionItem";
import { Option } from "../../types/Vote";
import "./SubmitVote.css";

const SubmitVote = () => {
  const { question, submitVote } = useVoteContext();
  const [selectedVote, setSelectedVote] = useState<Option>({} as Option);

  const handleSubmit = () => {
    submitVote(selectedVote);
    setSelectedVote({} as Option);
  };

  return (
    <div className="submit-vote">
      {question.title !== "" || !!question.options.length ? (
        <>
          <h3>Vote Here</h3>

          <p data-testid="question">
            Q: <strong>{question.title}</strong>
          </p>

          <div>
            {!!question.options.length &&
              question.options.map((opt) => (
                <OptionItem
                  key={opt.id}
                  option={opt}
                  onSelect={(option: Option) => setSelectedVote(option)}
                  selected={selectedVote.id === opt.id}
                />
              ))}
          </div>

          <div className="footer">
            {question.options.length < 2 && (
              <p className="error">
                You can't vote yet, at least 2 options are needed!
              </p>
            )}
            <button
              disabled={question.options.length < 2 || !selectedVote?.id}
              onClick={handleSubmit}
              data-testid="submit-vote"
            >
              Vote
            </button>
          </div>
        </>
      ) : (
        <p>No poll has been created.</p>
      )}
    </div>
  );
};

export default SubmitVote;
