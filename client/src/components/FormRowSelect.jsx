const FormRowSelect = ({ name, labelText, list, defaultValue = '' }) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText || name}
      </label>
      <select
        className="form-select"
        name={name}
        id={name}
        defaultValue={defaultValue}
      >
        {list?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FormRowSelect;
