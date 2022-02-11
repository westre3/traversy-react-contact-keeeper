import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';

function ContactItem({ contact, deleteHandler }) {
  const { _id: id, name, email, phone, type } = contact;
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  function onDelete() {
    deleteContact(id);
    clearCurrent(contact);
  }

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
          {type[0].toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' />
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' />
            {phone}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrent(contact)}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
