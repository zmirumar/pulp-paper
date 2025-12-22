import { useEffect } from 'react';
import { DrawerStyled } from './style';
import { Drawer as AntdDrawer, Button } from 'antd';
import '@/styles/drawer.css';

export interface DrawerProps {
  title?: string;
  children?: React.ReactNode;
  open: boolean;
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  footer?: React.ReactNode;
  className?: string;
  showFooter?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
  closeButtonPosition?: "start" | "end";
}

export const Drawer = ({
  title,
  children,
  open,
  onClose,
  closeButtonPosition = "end",
  footer,
  className = '',
  showFooter = false,
  cancelText = 'Отменить',
  confirmText = 'Подтвердить',
  onCancel,
  onConfirm,
  confirmDisabled = false,
}: DrawerProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const defaultFooter = showFooter ? (
    <DrawerStyled>
      <div className="buttons_wrapper">
        <Button 
          className='cancel_button' 
          onClick={onCancel}
          disabled={confirmDisabled}
        >
          {cancelText}
        </Button>
        <Button 
          className='confirm_button' 
          type="primary" 
          onClick={onConfirm} 
          disabled={confirmDisabled}
        >
          {confirmText}
        </Button>
      </div>
    </DrawerStyled>
  ) : null;

  return (
    <AntdDrawer
      title={title}
      open={open}
      onClose={onClose}
      destroyOnClose
      className={`custom-drawer close-${closeButtonPosition} ${className}`}
      footer={footer !== undefined ? footer : defaultFooter}
    >
      {children}
    </AntdDrawer>
  );
};