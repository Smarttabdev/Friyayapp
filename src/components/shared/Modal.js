import React from 'react';
import ReactModal from 'react-modal';

const Modal = ({
  styles,
  children,
  open,
  onClose,
  containerClassName,
  disabled,
  ...props
}) => {
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'transparent',
          zIndex: 1000,
          ...styles?.overlay
        },
        content: {
          width: 765,
          height: 440,
          inset: '50% 50%',
          border: 0,
          borderRadius: 12,
          boxShadow:
            '0 19px 38px rgba(0, 0, 0, 30%), 0 15px 12px rgba(0, 0, 0, 22%',
          transform: 'translate(-50%, -65%)',
          padding: '23px 37px',
          ...styles?.content
        }
      }}
      {...props}
    >
      <div
        className={cn(
          'modal-inner-container',
          disabled && 'disabled',
          containerClassName
        )}
      >
        <span
          role="button"
          className="material-icons absolute"
          onClick={onClose}
          style={{ top: 25, right: 22, color: 'rgba(0, 0, 0, .54)' }}
        >
          close
        </span>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
