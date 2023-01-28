import { useCallback, useState } from "react";
import { useVoteContext } from "../../../context/VoteContext";
import { toast } from "react-toastify";

const AddOption = () => {
  const { updateOptions, question } = useVoteContext();
  const [value, setValue] = useState("");

  const AddOption = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (!question.title) {
        toast.warn("Please First Add Question Title");
        return;
      }
      const id = Date.now();
      updateOptions({ id, value });
      setValue("");
    },
    [value, updateOptions, question]
  );

  return (
    <form onSubmit={AddOption}>
      <input
        type="text"
        value={value}
        placeholder="Set answer..."
        onChange={(e) => setValue(e.target.value)}
      />
      <button disabled={value === ""} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddOption;
