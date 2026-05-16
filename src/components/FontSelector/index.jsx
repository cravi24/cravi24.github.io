import './index.scss';
import Fonts from '../../constants/Fonts';

function FontSelector({ setFont }) {
  return (
    <div className="FontSelectorComponent">
      <label htmlFor="current-font">Select font:</label>
      <select
        name="current-font"
        id="current-font"
        onChange={(e) => setFont(e.target.value)}
      >
        {Fonts.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}

export default FontSelector;
