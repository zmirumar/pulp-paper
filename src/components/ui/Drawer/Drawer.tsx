import { Drawer as AntdDrawer } from 'antd';
import { useEffect } from 'react';
import { DrawerStyled } from './style';

export interface DrawerProps {
  title?: string;
  children?: React.ReactNode;
  open: boolean;
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  closable?: boolean;
  footer?: React.ReactNode;
  width?: number;
  className?: string;
  showFooter?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
}

export const Drawer = ({
  title,
  children,
  open,
  onClose,
  closable = true,
  footer,
  className = '',
  showFooter = false,
  cancelText = '',
  confirmText = '',
  width = 525,
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
        <button className="button cancel" onClick={onCancel} disabled={confirmDisabled}>
          {cancelText}
        </button>
        <button
          className="button add"
          onClick={onConfirm}
          disabled={confirmDisabled}
        >
          {confirmText}
        </button>
    </DrawerStyled>
  ) : null;

  return (
    <DrawerStyled>
    <AntdDrawer
      title={title}
      open={open}
      onClose={onClose}
      closable={closable}
      footer={footer !== undefined ? footer : defaultFooter} 
      width={width}
      className={className}
    >
      {children}
    </AntdDrawer>
    </DrawerStyled>
  );
};