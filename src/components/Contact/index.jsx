import { useState } from 'react';
import './index.scss';
import userIcon from '../../assets/svg/user.svg';
import editPencil from '../../assets/svg/pencil-f.svg';
import saveIcon from '../../assets/svg/save-f.svg';
import IconHeader from '../IconHeader';

function Contact() {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [address, setAddress] = useState('Berlin, BE, 12059');
  const [phoneNumber, setPhoneNumber] = useState('017635091028');
  const [email, setEmail] = useState('dummy@gmail.com');

  const saveContact = () => {
    setAddress(document.getElementById('address').value);
    setPhoneNumber(document.getElementById('phone-number').value);
    setEmail(document.getElementById('email').value);
    setIsEditModeOn(false);
  };

  if (isEditModeOn) {
    return editableContact(
      address,
      phoneNumber,
      email,
      saveContact,
      setIsEditModeOn
    );
  }
  return (
    <div className="contact">
      <IconHeader
        icon={userIcon}
        header="Contact"
        editPencil={editPencil}
        setIsEditModeOn={() => setIsEditModeOn(true)}
      />
      <div className="contact-header">Address</div>
      <p>{address}</p>
      <div className="contact-header">Phone</div>
      <p>{phoneNumber}</p>
      <div className="contact-header">Email</div>
      <span>{email}</span>
    </div>
  );
}

const editableContact = (address, phoneNumber, email, saveContact) => {
  return (
    <div className="contact">
      <IconHeader
        icon={userIcon}
        header="Contact"
        editPencil={saveIcon}
        setIsEditModeOn={saveContact}
      />
      <div className="contact-header">Address</div>
      <input id="address" defaultValue={address} type="text" />
      <div className="contact-header">Phone</div>
      <input id="phone-number" defaultValue={phoneNumber} type="text" />
      <div className="contact-header">Email</div>
      <input id="email" defaultValue={email} type="text" />
    </div>
  );
};

export default Contact;
