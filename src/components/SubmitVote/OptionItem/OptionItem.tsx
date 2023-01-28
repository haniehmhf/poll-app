import { Option } from "./../../../types/Vote";
import "./OptionItem.css";
const OptionItem = ({
  option,
  onSelect,
  selected,
}: {
  option: Option;
  onSelect: (option: Option) => void;
  selected: boolean;
}) => (
  <label className="option-item">
    <input
      type="radio"
      value={option.value}
      onChange={(e) => (e.target.checked ? onSelect(option) : null)}
      name="vote"
      checked={selected}
    />
    {option.value}
  </label>
);

export default OptionItem;
