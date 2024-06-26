import { Button, CircularProgress } from '@mui/material';
import { FC, MouseEventHandler, ReactNode } from 'react';

type ZUIButtonType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'destructive'
  | 'warning'
  | 'loading';

interface ZUIButtonProps {
  disabled?: boolean;
  endIcon?: ReactNode;
  label: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: 'large' | 'medium' | 'small';
  startIcon?: ReactNode;
  type?: ZUIButtonType;
}

const getVariant = (type: ZUIButtonType) => {
  if (type === 'secondary') {
    return 'outlined';
  } else if (type === 'tertiary') {
    return 'text';
  } else {
    return 'contained';
  }
};

const getColor = (type: ZUIButtonType) => {
  if (type === 'destructive') {
    return 'error';
  } else if (type === 'warning') {
    return 'warning';
  } else {
    return 'primary';
  }
};

const getLoadingIndicatorSize = (size: 'large' | 'medium' | 'small') => {
  if (size == 'large') {
    return '15px';
  } else if (size == 'medium') {
    return '14px';
  } else if (size == 'small') {
    return '13px';
  }
};

const getLoadingIndicatorPadding = (size: 'large' | 'medium' | 'small') => {
  if (size == 'large') {
    return 1.7;
  } else if (size == 'medium') {
    return 1.4;
  } else if (size == 'small') {
    return 1.1;
  }
};

const ZUIButton: FC<ZUIButtonProps> = ({
  disabled,
  endIcon,
  label,
  onClick,
  size = 'medium',
  startIcon,
  type = 'primary',
}) => {
  const isLoading = type === 'loading';
  return (
    <Button
      color={getColor(type)}
      disabled={disabled || isLoading}
      endIcon={endIcon}
      onClick={onClick}
      size={size}
      startIcon={startIcon}
      sx={{ padding: isLoading ? getLoadingIndicatorPadding(size) : '' }}
      variant={getVariant(type)}
    >
      {isLoading ? (
        <CircularProgress size={getLoadingIndicatorSize(size)} />
      ) : (
        label
      )}
    </Button>
  );
};

export default ZUIButton;
