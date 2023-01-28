import { useState } from "react";
import { useVoteContext } from "../../context/VoteContext";
import OptionItem from "./OptionItem/OptionItem";
import { Option } from "../../types/Vote";

const SubmitVote = () => {
  const { question, submitVote } = useVoteContext();
  const [selectedVote, setSelectedVote] = useState<Option>({} as Option);

  const handleSubmit = () => {
    submitVote(selectedVote);
    setSelectedVote({} as Option);
  };

  return (
    <div>
      {question.title !== "" || !!question.options.length ? (
        <>
          <div>
            {question.options.length >= 2 ? (
              <h3>Vote Here</h3>
            ) : (
              <p className="error">
                You cannot answer this poll (at least 2 option)
              </p>
            )}
            <p>
              <strong>{question.title}</strong>
            </p>

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
          <button
            disabled={
              question.options.length < 2 || !Object.values(selectedVote).length
            }
            onClick={handleSubmit}
          >
            Vote
          </button>
        </>
      ) : (
        <p>There is no created poll</p>
      )}
    </div>
  );
};

export default SubmitVote;
