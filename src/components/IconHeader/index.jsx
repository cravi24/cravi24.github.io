import './index.scss';

function IconHeader({ icon, editPencil, header, setIsEditModeOn, styleClass }) {
  return (
    <div className="IconHeaderComponent">
      <div className="header-with-icon">
        {icon && <img src={icon} alt={`${header} icon`} />}
        <div className={styleClass}>{header}</div>
      </div>
      {editPencil && (
        <img
          className="edit-icon"
          src={editPencil}
          alt="Edit icon"
          onClick={setIsEditModeOn}
        />
      )}
    </div>
  );
}

export default IconHeader;
