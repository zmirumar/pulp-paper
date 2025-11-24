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
  height?: number | string;
  zIndex?: number;
  closable?: boolean;
  maskClosable?: boolean;
  mask?: boolean;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  drawerStyle?: React.CSSProperties;
  destroyOnClose?: boolean;
  forceRender?: boolean;
  getContainer?: string | false | HTMLElement | undefined;
  rootClassName?: string;
  className?: string;
  push?: boolean;
  size?: 'default' | 'large';
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
  height,
  zIndex = 2050,
  closable = true,
  maskClosable = true,
  mask = true,
  footer,
  extra,
  bodyStyle,
  headerStyle,
  footerStyle,
  drawerStyle,
  destroyOnClose,
  forceRender,
  getContainer,
  rootClassName = '',
  className = '',
  push,
  size,
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
      height={height}
      zIndex={zIndex}
      closable={closable}
      maskClosable={maskClosable}
      mask={mask}
      footer={footer !== undefined ? footer : defaultFooter}
      extra={extra}
      bodyStyle={bodyStyle}
      headerStyle={headerStyle}
      footerStyle={footerStyle}
      drawerStyle={drawerStyle}
      destroyOnClose={destroyOnClose}
      forceRender={forceRender}
      getContainer={getContainer}
      rootClassName={rootClassName}
      className={className}
      push={push}
      size={size}
    >
      {children}
    </AntdDrawer>
  );
};