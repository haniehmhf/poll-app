import { useVoteContext } from "../../../context/VoteContext";
import { Option } from "../../../types/Vote";

const EditableOptionItem = ({ option }: { option: Option }) => {
  const { updateOptions, deleteOption } = useVoteContext();
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Set answer..."
        value={option.value}
        onChange={(e) => updateOptions({ ...option, value: e.target.value })}
        maxLength={80}
      />
      <button type="button" onClick={() => deleteOption(option.id)}>
        x
      </button>
    </form>
  );
};

export default EditableOptionItem;
