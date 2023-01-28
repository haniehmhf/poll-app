import { useCallback, useState } from "react";
import { useVoteContext } from "../../../context/VoteContext";

const AddOption = () => {
  const { updateOptions } = useVoteContext();
  const [value, setValue] = useState("");

  const AddOption = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const id = Date.now();
      updateOptions({ id, value });
      setValue("");
    },
    [value, updateOptions]
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
