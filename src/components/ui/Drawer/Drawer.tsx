import { useEffect } from 'react';
import { DrawerStyled } from './style';
import { Drawer as AntdDrawer } from 'antd';
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
  closable?: boolean;
}

export const Drawer = ({
  title,
  children,
  open,
  onClose,
  closeButtonPosition = "end",
  footer,
  closable = true ,
  className = '',
  showFooter = false,
  cancelText = '',
  confirmText = '',
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
  }, [open]);

  const defaultFooter = showFooter ? (
    <DrawerStyled>
      <div className="buttons">
        <button 
          className="button cancel" 
          onClick={onCancel} 
          disabled={confirmDisabled}
        >
          {cancelText}
        </button>
        <button
          className="button add"
          onClick={onConfirm}
          disabled={confirmDisabled}
        >
          {confirmText}
        </button>
      </div>
    </DrawerStyled>
  ) : null;

  return (
    <AntdDrawer
      title={title}
      open={open}
      onClose={onClose}
      closable={closable}
      className={`custom-drawer close-${closeButtonPosition} ${className}`}
      footer={footer !== undefined ? footer : defaultFooter}
    >
      {children}
    </AntdDrawer>
  );
};