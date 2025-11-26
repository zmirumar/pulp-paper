import { Drawer as AntdDrawer } from 'antd';
import { useEffect } from 'react';
import { DrawerFooterStyled } from './style';

export interface DrawerProps {
  title?: string;
  children?: React.ReactNode;
  open: boolean;
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  width?: number | string;
  closable?: boolean;
  footer?: React.ReactNode;
  destroyOnClose?: boolean;
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
  placement = 'right',
  width = 525,
  closable = true,
  footer,
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
    <DrawerFooterStyled>
      <button className="button cancel" onClick={onCancel}>
        {cancelText}
      </button>
      <button 
        className="button add"
        onClick={onConfirm} 
        disabled={confirmDisabled}
      >
        {confirmText}
      </button>
    </DrawerFooterStyled>
  ) : null;

  return (
    <AntdDrawer
      title={title}
      open={open}
      onClose={onClose}
      placement={placement}
      width={width}
      closable={closable}
      footer={footer !== undefined ? footer : defaultFooter}
      className={className}

    >
      {children}
    </AntdDrawer>
  );
};