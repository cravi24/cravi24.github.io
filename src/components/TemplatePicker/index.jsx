import './index.scss';
import Templates from '../../templates';

const TemplatePicker = ({ value, onChange }) => (
  <div className="TemplatePickerComponent">
    <label htmlFor="current-template">Select template:</label>
    <select
      id="current-template"
      name="current-template"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {Object.entries(Templates).map(([key, { name }]) => (
        <option key={key} value={key}>{name}</option>
      ))}
    </select>
  </div>
);

export default TemplatePicker;
